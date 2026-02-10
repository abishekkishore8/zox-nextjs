import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FlyMenu } from "@/components/FlyMenu";
import { FlyMenuProvider } from "@/components/FlyMenuContext";
import { FlyMenuFade } from "@/components/FlyMenuFade";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchOverlay } from "@/components/SearchOverlay";
import { ThemeScript } from "@/components/ThemeScript";
import { siteConfig } from "@/lib/config";
import ConditionalLayout from "@/components/ConditionalLayout";

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
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <ThemeScript />
      </body>
    </html>
  );
}
