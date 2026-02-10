'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuthHeaders } from '@/lib/admin-auth';
import ImageUpload from '@/components/admin/ImageUpload';

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    description: '',
    location: '',
    eventDate: '',
    eventTime: '',
    imageUrl: '',
    externalUrl: '',
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'past' | 'cancelled',
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to create event');
        setLoading(false);
        return;
      }

      router.push('/admin/events');
    } catch (err) {
      setError('An error occurred while creating the event');
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link
          href="/admin/events"
          style={{
            color: '#48bb78',
            textDecoration: 'none',
            marginBottom: '1rem',
            display: 'inline-block',
          }}
        >
          ← Back to Events
        </Link>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#1a202c',
          marginTop: '0.5rem',
        }}>
          Create New Event
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
            onChange={(e) => handleTitleChange(e.target.value)}
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
            Location *
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
            placeholder="e.g., San Francisco, CA"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#4a5568',
            }}>
              Event Date *
            </label>
            <input
              type="date"
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
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
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#4a5568',
            }}>
              Event Time
            </label>
            <input
              type="time"
              value={formData.eventTime}
              onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
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
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#4a5568',
          }}>
            Excerpt
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
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
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={5}
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
          label="Event Image"
        />

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#4a5568',
          }}>
            External URL
          </label>
          <input
            type="url"
            value={formData.externalUrl}
            onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
            placeholder="https://..."
          />
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
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'upcoming' | 'ongoing' | 'past' | 'cancelled' })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="past">Past</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 2rem',
              background: loading ? '#a0aec0' : '#48bb78',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
          <Link
            href="/admin/events"
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

