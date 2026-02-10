'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Force dynamic rendering for login page
export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // Store token in localStorage
      if (data.data?.token) {
        localStorage.setItem('admin_token', data.data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.data.user));
      }

      // Redirect to admin dashboard
      router.push('/admin');
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        animation: 'float 20s infinite linear',
      }} />
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-50px, -50px) rotate(360deg); }
        }
      `}</style>

      <div style={{
        background: 'rgba(255, 255, 255, 0.98)',
        padding: '3rem',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.5)',
        width: '100%',
        maxWidth: '440px',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: '#0f172a',
            letterSpacing: '-0.02em',
          }}>
            Admin Login
          </h1>
          <p style={{
            color: '#64748b',
            fontSize: '0.9375rem',
            margin: 0,
          }}>
            Sign in to access the admin panel
          </p>
        </div>

        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            color: '#991b1b',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            border: '1px solid #fca5a5',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.625rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#334155',
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.9375rem',
                boxSizing: 'border-box',
                transition: 'all 0.2s',
                background: '#ffffff',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
              placeholder="admin@startupnews.fyi"
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.625rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#334155',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.9375rem',
                boxSizing: 'border-box',
                transition: 'all 0.2s',
                background: '#ffffff',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: loading 
                ? '#cbd5e1' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: loading 
                ? 'none' 
                : '0 4px 12px rgba(102, 126, 234, 0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" opacity="0.25"></circle>
                  <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
