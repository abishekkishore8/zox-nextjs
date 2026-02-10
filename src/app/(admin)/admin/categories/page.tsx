'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { getAuthHeaders } from '@/lib/admin-auth';
import { useAdminData } from '@/hooks/useAdminData';
import Pagination from '@/components/admin/Pagination';
import SearchBar from '@/components/admin/SearchBar';
import LoadingSkeleton from '@/components/admin/LoadingSkeleton';
import { AdminErrorBoundary } from '@/components/admin/ErrorBoundary';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
}

export default function CategoriesPage() {
  const {
    data: categories,
    loading,
    error,
    refetch,
    pagination,
    setPage,
    setLimit,
    setSearch,
  } = useAdminData<Category>({
    endpoint: '/api/admin/categories',
    limit: 20,
  });

  const handleDelete = useCallback(async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.error || 'Failed to delete category');
        return;
      }

      refetch();
    } catch {
      alert('An error occurred while deleting the category');
    }
  }, [refetch]);

  return (
    <AdminErrorBoundary>
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
              color: '#0f172a',
              letterSpacing: '-0.02em',
            }}>
              Categories
            </h1>
            <p style={{
              color: '#64748b',
              fontSize: '1rem',
              margin: 0,
            }}>
              Organize your content with categories
            </p>
          </div>
          <Link
            href="/admin/categories/create"
            style={{
              padding: '0.875rem 1.75rem',
              background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.9375rem',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 12px rgba(237, 137, 54, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(237, 137, 54, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(237, 137, 54, 0.3)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New Category
          </Link>
        </div>

        {/* Search */}
        <div style={{
          marginBottom: '1.5rem',
        }}>
          <SearchBar
            value=""
            onChange={setSearch}
            placeholder="Search categories by name, slug, or description..."
          />
        </div>

        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            color: '#991b1b',
            padding: '1rem 1.25rem',
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

        {loading ? (
          <LoadingSkeleton rows={10} columns={5} />
        ) : categories.length === 0 ? (
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            padding: '4rem 2rem',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16"></path>
              </svg>
            </div>
            <h3 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              No categories found
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
              Get started by creating your first category
            </p>
            <Link
              href="/admin/categories/create"
              style={{
                padding: '0.875rem 1.75rem',
                background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.9375rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(237, 137, 54, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(237, 137, 54, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(237, 137, 54, 0.3)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create Your First Category
            </Link>
          </div>
        ) : (
          <>
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(0, 0, 0, 0.04)',
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'separate',
                  borderSpacing: 0,
                }}>
                  <thead>
                    <tr style={{
                      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    }}>
                      <th style={{
                        padding: '1.25rem 1.5rem',
                        textAlign: 'left',
                        fontWeight: '600',
                        fontSize: '0.75rem',
                        color: '#475569',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                      }}>
                        Name
                      </th>
                      <th style={{
                        padding: '1.25rem 1.5rem',
                        textAlign: 'left',
                        fontWeight: '600',
                        fontSize: '0.75rem',
                        color: '#475569',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                      }}>
                        Slug
                      </th>
                      <th style={{
                        padding: '1.25rem 1.5rem',
                        textAlign: 'left',
                        fontWeight: '600',
                        fontSize: '0.75rem',
                        color: '#475569',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                      }}>
                        Description
                      </th>
                      <th style={{
                        padding: '1.25rem 1.5rem',
                        textAlign: 'left',
                        fontWeight: '600',
                        fontSize: '0.75rem',
                        color: '#475569',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                      }}>
                        Sort Order
                      </th>
                      <th style={{
                        padding: '1.25rem 1.5rem',
                        textAlign: 'right',
                        fontWeight: '600',
                        fontSize: '0.75rem',
                        color: '#475569',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                      }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr
                        key={category.id || category.slug || `category-${index}`}
                        style={{
                          borderBottom: index < categories.length - 1 ? '1px solid rgba(0, 0, 0, 0.04)' : 'none',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f8fafc';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <div style={{ fontWeight: '600', color: '#0f172a' }}>
                            {category.name}
                          </div>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontSize: '0.9375rem' }}>
                          {category.slug}
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontSize: '0.9375rem' }}>
                          {category.description || (
                            <span style={{ color: '#cbd5e1', fontStyle: 'italic' }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontSize: '0.9375rem' }}>
                          {category.sortOrder}
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <Link
                              href={`/admin/categories/edit/${category.id}`}
                              style={{
                                padding: '0.5rem 1rem',
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: 'white',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(245, 158, 11, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(245, 158, 11, 0.2)';
                              }}
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(category.id)}
                              style={{
                                padding: '0.5rem 1rem',
                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(239, 68, 68, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.2)';
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
                limit={pagination.limit}
                total={pagination.total}
                onLimitChange={setLimit}
              />
            )}
          </>
        )}
      </div>
    </AdminErrorBoundary>
  );
}
