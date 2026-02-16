'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuthHeaders, getAdminUser, getAdminToken } from '@/lib/admin-auth';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { getPresignedUploadUrl } from '@/app/actions/upload-image';

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CreatePostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categoryId: '',
    featuredImageUrl: '',
    featuredImageSmallUrl: '',
    format: 'standard' as 'standard' | 'video' | 'gallery',
    status: 'draft' as 'draft' | 'published' | 'archived',
    featured: false,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories', {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  /**
   * Get a presigned S3 PUT URL.
   * Strategy: Try Server Action first, fall back to API route.
   */
  const getUploadUrl = async (filename: string, contentType: string, token: string) => {
    // Attempt 1: Server Action (bypasses WAF since it goes through page URL)
    try {
      const result = await getPresignedUploadUrl(filename, contentType, token);
      if (result.success && result.data) {
        return result.data;
      }
      console.warn('Server Action presign failed:', result.error);
    } catch (e) {
      console.warn('Server Action presign threw:', e);
    }

    // Attempt 2: API route (tiny JSON, no file data — should pass WAF)
    try {
      const res = await fetch('/api/admin/presign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Admin-Token': token,
        },
        body: JSON.stringify({ filename, contentType }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          return data.data;
        }
      }
      console.warn('API presign failed:', res.status);
    } catch (e) {
      console.warn('API presign threw:', e);
    }

    throw new Error('Could not get upload URL. Please try again or contact support.');
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setError('Image must be under 50MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const token = getAdminToken();
      if (!token) {
        throw new Error('Please log in again (no auth token found)');
      }

      // Step 1: Get presigned S3 PUT URL (tiny request, no file data)
      const { uploadUrl, fileUrl } = await getUploadUrl(file.name, file.type, token);

      // Step 2: Upload file directly to S3 (bypasses CloudFront WAF entirely)
      const s3Response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!s3Response.ok) {
        throw new Error(`S3 upload failed (${s3Response.status}). Please try again.`);
      }

      // Step 3: Set the final S3 URL in the form
      setFormData(prev => ({
        ...prev,
        featuredImageUrl: fileUrl,
        featuredImageSmallUrl: fileUrl,
      }));
      setFeaturedImageFile(file);
    } catch (err) {
      console.error('Image upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload image');
      setFeaturedImageFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user = getAdminUser();
    if (!user) {
      setError('User not found. Please login again.');
      setLoading(false);
      return;
    }

    try {
      const categoryId = formData.categoryId ? parseInt(formData.categoryId, 10) : NaN;
      if (!formData.categoryId || isNaN(categoryId)) {
        setError('Please select a category.');
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        categoryId,
        authorId: user.id,
        featuredImageSmallUrl: formData.featuredImageSmallUrl || formData.featuredImageUrl,
      };

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      let data: { success?: boolean; error?: string; data?: unknown } = {};
      try {
        const text = await response.text();
        if (text) data = JSON.parse(text);
      } catch {
        setError(response.ok ? 'Invalid response from server.' : `Server error (${response.status}). Please try again.`);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError(data.error || `Failed to create post (${response.status})`);
        setLoading(false);
        return;
      }

      if (!data.success) {
        setError(data.error || 'Failed to create post');
        setLoading(false);
        return;
      }

      router.push('/admin/posts');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred while creating the post';
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link
          href="/admin/posts"
          style={{
            color: '#667eea',
            textDecoration: 'none',
            marginBottom: '1rem',
            display: 'inline-block',
          }}
        >
          ← Back to Posts
        </Link>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#1a202c',
          marginTop: '0.5rem',
        }}>
          Create New Post
        </h1>
      </div>

      {error && (
        <div style={{
          background: '#fed7d7',
          color: '#c53030',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4a5568' }}>
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4a5568' }}>
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4a5568' }}>
            Category *
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            required
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box' }}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4a5568' }}>
            Excerpt *
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
            rows={3}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4a5568' }}>
            Content *
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            placeholder="Write your news article content..."
            minHeight={280}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4a5568' }}>
            Featured Image
          </label>
          {formData.featuredImageUrl && (
            <div style={{ marginBottom: '1rem', position: 'relative', display: 'inline-block' }}>
              <img
                src={formData.featuredImageUrl}
                alt="Preview"
                style={{ maxWidth: 300, maxHeight: 200, borderRadius: 4, border: '1px solid #e2e8f0' }}
              />
              <button
                type="button"
                onClick={() => {
                  setFormData((p) => ({ ...p, featuredImageUrl: '', featuredImageSmallUrl: '' }));
                  setFeaturedImageFile(null);
                }}
                style={{
                  position: 'absolute', top: '0.5rem', right: '0.5rem',
                  background: '#e53e3e', color: 'white', border: 'none', borderRadius: '50%',
                  width: 24, height: 24, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                ×
              </button>
            </div>
          )}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <label style={{
              padding: '0.75rem 1.5rem',
              background: uploading ? '#cbd5e0' : '#667eea',
              color: 'white', borderRadius: 4,
              cursor: uploading ? 'wait' : 'pointer',
              fontSize: '0.875rem', fontWeight: 500,
              display: 'inline-block', textAlign: 'center',
            }}>
              {uploading ? 'Uploading...' : 'Choose image (uploads immediately)'}
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
            </label>
            <div style={{ flex: 1, minWidth: 200 }}>
              <input
                type="url"
                value={formData.featuredImageUrl}
                onChange={(e) => {
                  setFormData((p) => ({
                    ...p,
                    featuredImageUrl: e.target.value,
                    featuredImageSmallUrl: e.target.value || p.featuredImageSmallUrl,
                  }));
                  setFeaturedImageFile(null);
                }}
                placeholder="Or enter image URL"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: 4, fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <p style={{ marginTop: '0.5rem', fontSize: '0.8125rem', color: '#64748b' }}>
            Select an image to upload it immediately. The URL will appear above.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4a5568' }}>
            Format
          </label>
          <select
            value={formData.format}
            onChange={(e) => setFormData({ ...formData, format: e.target.value as 'standard' | 'video' | 'gallery' })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box' }}
          >
            <option value="standard">Standard</option>
            <option value="video">Video</option>
            <option value="gallery">Gallery</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4a5568' }}>
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'archived' })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box' }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              style={{ marginRight: '0.5rem' }}
            />
            <span style={{ fontWeight: '500', color: '#4a5568' }}>Featured Post</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={loading || uploading}
            style={{
              padding: '0.75rem 2rem',
              background: loading || uploading ? '#a0aec0' : '#667eea',
              color: 'white', border: 'none', borderRadius: '4px',
              fontSize: '1rem', fontWeight: '500',
              cursor: loading || uploading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          <Link
            href="/admin/posts"
            style={{
              padding: '0.75rem 2rem', background: '#e2e8f0', color: '#4a5568',
              borderRadius: '4px', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', display: 'inline-block',
            }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
