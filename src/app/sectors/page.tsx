import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { getCategoryDisplayName, getPostsByCategory, HOME_WIDGET_CATEGORY_MAP, getPostImage, type Post } from "@/lib/data-adapter";
import { PostImage } from "@/components/PostImage";

import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://startupnews.thebackend.in";

export const metadata: Metadata = {
  title: "Sectors",
  description: "Explore startup news and stories across AI, fintech, ecommerce, healthtech, EVs, and more industry sectors on StartupNews.fyi.",
  alternates: { canonical: `${SITE_URL}/sectors` },
  openGraph: {
    title: "Sectors – StartupNews.fyi",
    description: "Explore startup news across AI, fintech, ecommerce, healthtech, and more.",
    url: `${SITE_URL}/sectors`,
    siteName: "StartupNews.fyi",
    type: "website",
  },
};


interface SectorInfo {
  slug: string;
  label: string;
  href: string;
  featuredPost: Post | null;
  displayName: string;
}

// Get all unique sectors from both menu and flyMenu
function getAllSectors(): Array<{ slug: string; label: string; href: string }> {
  const sectorsMap = new Map<string, { slug: string; label: string; href: string }>();

  // Add sectors from main menu
  const menuSectors = siteConfig.menu
    .find(item => item.label === "SECTORS")
    ?.children || [];

  menuSectors.forEach(sector => {
    const slug = sector.href.replace('/sectors/', '');
    sectorsMap.set(slug, {
      slug,
      label: sector.label,
      href: sector.href,
    });
  });

  // Add sectors from fly menu (may have different labels)
  const flySectors = siteConfig.flyMenu
    .find(item => item.id === "sectors")
    ?.children || [];

  flySectors.forEach(sector => {
    const slug = sector.href.replace('/sectors/', '');
    if (!sectorsMap.has(slug)) {
      sectorsMap.set(slug, {
        slug,
        label: sector.label,
        href: sector.href,
      });
    }
  });

  return Array.from(sectorsMap.values());
}

export default async function SectorsPage() {
  const allSectors = getAllSectors();

  // Fetch data for each sector in parallel
  const sectorsData = await Promise.all(
    allSectors.map(async (sector) => {
      try {
        // Get featured post for preview image
        const posts = await getPostsByCategory(sector.slug, 1);
        const featuredPost = posts.length > 0 ? posts[0] : null;

        // Get display name from database or use fallback
        const fallbackName = HOME_WIDGET_CATEGORY_MAP[sector.slug] || sector.label;
        const displayName = await getCategoryDisplayName(sector.slug, fallbackName);

        return {
          slug: sector.slug,
          label: sector.label,
          href: sector.href,
          featuredPost,
          displayName,
        } as SectorInfo;
      } catch (error) {
        console.error(`Error fetching data for sector ${sector.slug}:`, error);
        // Return sector with no featured post on error
        const fallbackName = HOME_WIDGET_CATEGORY_MAP[sector.slug] || sector.label;
        return {
          slug: sector.slug,
          label: sector.label,
          href: sector.href,
          featuredPost: null,
          displayName: fallbackName,
        } as SectorInfo;
      }
    })
  );

  // Sort sectors alphabetically by display name
  sectorsData.sort((a, b) => a.displayName.localeCompare(b.displayName));

  return (
    <div className="mvp-main-blog-wrap left relative sectors-page">
      <div className="mvp-main-box sectors-container">
        <div className="mvp-main-blog-cont left relative">
          <header className="sectors-header">
            <h1 className="sectors-title">Sectors</h1>
            <p className="sectors-subtitle">
              Explore startup news and stories across different sectors and industries.
            </p>
          </header>

          <div className="mvp-main-blog-out left relative sectors-out">
            <div className="mvp-main-blog-in sectors-in">
              <div className="mvp-main-blog-body left relative sectors-body">
                <div className="sectors-grid">
                  {sectorsData.map((sector) => (
                    <Link
                      key={sector.slug}
                      href={sector.href}
                      className="sector-card"
                    >
                      <div className="sector-card-image">
                        {sector.featuredPost ? (
                          <PostImage
                            src={getPostImage(sector.featuredPost)}
                            alt={sector.displayName}
                            width={400}
                            height={240}
                            className="sector-image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="sector-image-placeholder">
                            <div className="sector-image-placeholder-icon">
                              <i className="fa fa-industry" aria-hidden="true"></i>
                            </div>
                          </div>
                        )}
                        <div className="sector-card-overlay"></div>
                      </div>
                      <div className="sector-card-content">
                        <h2 className="sector-card-title">{sector.displayName}</h2>
                        <div className="sector-card-arrow">
                          <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

