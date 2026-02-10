'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getAuthHeaders } from '@/lib/admin-auth';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    imageUrl: '',
    parentId: '',
    sortOrder: 0,
  });

  useEffect(() => {
    if (categoryId) {
      fetchCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to fetch category');
        setLoading(false);
        return;
      }

      const category = data.data;
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        imageUrl: category.imageUrl || '',
        parentId: category.parentId?.toString() || '',
        sortOrder: category.sortOrder || 0,
      });
    } catch {
      setError('An error occurred while fetching the category');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...formData,
          parentId: formData.parentId ? parseInt(formData.parentId) : undefined,
          sortOrder: parseInt(formData.sortOrder.toString()) || 0,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to update category');
        setSaving(false);
        return;
      }

      router.push('/admin/categories');
    } catch {
      setError('An error occurred while updating the category');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        Loading category...
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link
          href="/admin/categories"
          style={{
            color: '#ed8936',
            textDecoration: 'none',
            marginBottom: '1rem',
            display: 'inline-block',
          }}
        >
          ← Back to Categories
        </Link>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#1a202c',
          marginTop: '0.5rem',
        }}>
          Edit Category
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
            Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

        <ImageUpload
          value={formData.imageUrl}
          onChange={(url) => setFormData({ ...formData, imageUrl: url })}
          label="Category Image"
        />

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#4a5568',
          }}>
            Parent Category ID (optional)
          </label>
          <input
            type="number"
            value={formData.parentId}
            onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
            placeholder="Leave empty for top-level category"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#4a5568',
          }}>
            Sort Order
          </label>
          <input
            type="number"
            value={formData.sortOrder}
            onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
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

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '0.75rem 2rem',
              background: saving ? '#a0aec0' : '#ed8936',
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
            href="/admin/categories"
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

