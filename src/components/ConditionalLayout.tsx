'use client';

import { usePathname } from 'next/navigation';
import { FlyMenu } from "@/components/FlyMenu";
import { FlyMenuProvider } from "@/components/FlyMenuContext";
import { FlyMenuFade } from "@/components/FlyMenuFade";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchOverlay } from "@/components/SearchOverlay";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // For admin routes, render only the children (admin layout will handle its own structure)
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For frontend routes, render the full layout with Header, Footer, etc.
  return (
    <FlyMenuProvider>
      <FlyMenu />
      <div id="mvp-site" className="left relative">
        <SearchOverlay />
        <div id="mvp-site-wall" className="left relative">
          <div id="mvp-site-main" className="left relative">
            <Header />
            <div id="mvp-main-body-wrap" className="left relative" style={{ marginTop: "20px" }}>
              {children}
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <div className="mvp-fly-top back-to-top">
        <i className="fa fa-angle-up fa-3"></i>
      </div>
      <FlyMenuFade />
    </FlyMenuProvider>
  );
}

