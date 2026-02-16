'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAdminUser, verifyToken, clearAdminSession, AdminUser } from '@/lib/admin-auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Allow access to login page without auth
      if (pathname === '/admin/login') {
        setLoading(false);
        return;
      }

      const storedUser = getAdminUser();
      if (!storedUser) {
        setLoading(false);
        router.replace('/admin/login');
        return;
      }

      // Verify token with server (with timeout so we don't hang forever)
      const timeoutMs = 10000;
      const verifiedUser = await Promise.race([
        verifyToken(),
        new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error('Verification timeout')), timeoutMs)
        ),
      ]).catch(() => null);

      if (!verifiedUser) {
        clearAdminSession();
        setLoading(false);
        router.replace('/admin/login');
        return;
      }

      setUser(verifiedUser);
      setLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Show loading state
  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  // Login page doesn't need layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Header height constant (must match AdminSidebar)
  const headerHeight = 60;
  const sidebarWidth = sidebarOpen ? 260 : 70;

  // Admin pages with layout
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7fafc',
      }}
    >
      {/* Fixed Header */}
      <AdminHeader
        user={user}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      {/* Fixed Sidebar - positioned below header */}
      <AdminSidebar isOpen={sidebarOpen} />

      {/* Main Content Area - accounts for fixed header and sidebar */}
      <div
        style={{
          marginTop: `${headerHeight}px`,
          marginLeft: `${sidebarWidth}px`,
          transition: 'margin-left 0.3s ease',
          minHeight: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        <main
          style={{
            padding: '2rem',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
