'use client';

import { useState } from 'react';
import { getAdminToken } from '@/lib/admin-auth';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  accept?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Image',
  required = false,
  accept = 'image/*',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // Upload file
      // Note: Don't set Content-Type header for FormData - browser will set it with boundary
      const token = getAdminToken();
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: headers,
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to upload image');
        setUploading(false);
        return;
      }

      // Update preview and value
      const imageUrl = data.data.url;
      setPreview(imageUrl);
      onChange(imageUrl);
      setUploading(false);
    } catch (err) {
      setError('An error occurred while uploading the image');
      setUploading(false);
    }
  };

  const handleUrlChange = (url: string) => {
    setPreview(url);
    onChange(url);
  };

  const removeImage = () => {
    setPreview(null);
    onChange('');
    setError('');
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
        color: '#4a5568',
      }}>
        {label} {required && '*'}
      </label>

      {preview && (
        <div style={{
          marginBottom: '1rem',
          position: 'relative',
          display: 'inline-block',
        }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: '300px',
              maxHeight: '200px',
              borderRadius: '4px',
              border: '1px solid #e2e8f0',
            }}
            onError={() => setPreview(null)}
          />
          <button
            type="button"
            onClick={removeImage}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <label
          style={{
            padding: '0.75rem 1.5rem',
            background: uploading ? '#a0aec0' : '#667eea',
            color: 'white',
            borderRadius: '4px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            display: 'inline-block',
            textAlign: 'center',
          }}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>

        <div style={{ flex: 1 }}>
          <input
            type="url"
            value={value}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="Or enter image URL"
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

      {error && (
        <div style={{
          marginTop: '0.5rem',
          color: '#c53030',
          fontSize: '0.875rem',
        }}>
          {error}
        </div>
      )}

      {value && (
        <div style={{
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: '#718096',
        }}>
          Current: {value}
        </div>
      )}
    </div>
  );
}

