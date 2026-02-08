import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FlyMenu } from "@/components/FlyMenu";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchOverlay } from "@/components/SearchOverlay";
import { ThemeScript } from "@/components/ThemeScript";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FlyMenu />
        <div id="mvp-site" className="left relative">
          <SearchOverlay />
          <div id="mvp-site-wall" className="left relative">
            <div id="mvp-site-main" className="left relative">
              <Header />
              <div id="mvp-main-body-wrap" className="left relative">
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </div>
        <div className="mvp-fly-top back-to-top">
          <i className="fa fa-angle-up fa-3"></i>
        </div>
        <div className="mvp-fly-fade mvp-fly-but-click"></div>
        <ThemeScript />
      </body>
    </html>
  );
}
