/**
 * Client-side admin authentication utilities
 */

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

/**
 * Get stored admin token
 */
export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

/**
 * Get stored admin user
 */
export function getAdminUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('admin_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAdminToken();
}

/**
 * Clear admin session
 */
export function clearAdminSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
}

/**
 * Get headers for admin API requests.
 * Sends token in both Authorization and X-Admin-Token so auth works when proxies strip Authorization on GET.
 */
export function getAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  if (!token) return { 'Content-Type': 'application/json' };
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Admin-Token': token,
  };
}

/**
 * Verify token with server
 */
export async function verifyToken(): Promise<AdminUser | null> {
  const token = getAdminToken();
  if (!token) return null;

  try {
    const response = await fetch('/api/admin/auth/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Admin-Token': token,
      },
    });

    const data = await response.json();
    if (data.success && data.data?.user) {
      return data.data.user;
    }
    return null;
  } catch {
    return null;
  }
}

