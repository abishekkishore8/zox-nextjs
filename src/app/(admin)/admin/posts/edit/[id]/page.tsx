'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getAuthHeaders, getAdminUser } from '@/lib/admin-auth';
import ImageUpload from '@/components/admin/ImageUpload';

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
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
    const loadData = async () => {
      await fetchCategories();
      if (postId) {
        // Wait a bit for categories to load, then fetch post
        setTimeout(() => {
          fetchPost();
        }, 100);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

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

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to fetch post');
        setLoading(false);
        return;
      }

      const post = data.data;
      // Find category ID from category name - fetch categories if not loaded yet
      if (categories.length === 0) {
        await fetchCategories();
      }
      const category = categories.find(c => c.name === post.category || c.slug === post.categorySlug);
      
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        categoryId: category?.id.toString() || '',
        featuredImageUrl: post.image || '',
        featuredImageSmallUrl: post.imageSmall || '',
        format: post.format || 'standard',
        status: post.status || 'draft',
        featured: post.featured || false,
      });
    } catch {
      setError('An error occurred while fetching the post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const user = getAdminUser();
    if (!user) {
      setError('User not found. Please login again.');
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...formData,
          categoryId: parseInt(formData.categoryId),
          authorId: user.id,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to update post');
        setSaving(false);
        return;
      }

      router.push('/admin/posts');
    } catch {
      setError('An error occurred while updating the post');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        Loading post...
      </div>
    );
  }

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
          Edit Post
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
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#4a5568',
          }}>
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#4a5568',
          }}>
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#4a5568',
          }}>
            Category *
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#4a5568',
          }}>
            Excerpt *
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#4a5568',
          }}>
            Content *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={10}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <ImageUpload
          value={formData.featuredImageUrl}
          onChange={(url) => setFormData({ ...formData, featuredImageUrl: url })}
          label="Featured Image"
        />

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#4a5568',
          }}>
            Format
          </label>
          <select
            value={formData.format}
            onChange={(e) => setFormData({ ...formData, format: e.target.value as 'standard' | 'video' | 'gallery' })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          >
            <option value="standard">Standard</option>
            <option value="video">Video</option>
            <option value="gallery">Gallery</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#4a5568',
          }}>
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'archived' })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              style={{ marginRight: '0.5rem' }}
            />
            <span style={{ fontWeight: '500', color: '#4a5568' }}>
              Featured Post
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '0.75rem 2rem',
              background: saving ? '#a0aec0' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin/posts"
            style={{
              padding: '0.75rem 2rem',
              background: '#e2e8f0',
              color: '#4a5568',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'inline-block',
            }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

