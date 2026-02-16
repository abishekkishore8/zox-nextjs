import Link from "next/link";
import { getPostsByCategory, getStartupEvents, hasThumbnail } from "@/lib/data-adapter";
import { PostImage } from "@/components/PostImage";
import { StartupEventsSection } from "@/components/StartupEventsSection";
import { StickySidebarContent } from "@/components/StickySidebarContent";
import { MoreNewsSection } from "@/components/MoreNewsSection";
import { siteConfig } from "@/lib/config";

// Enable ISR - regenerate pages every hour
export const revalidate = 3600; // 1 hour

// Allow dynamic params for sectors not pre-generated
export const dynamicParams = true;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://startupnews.thebackend.in";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const sectorItem = siteConfig.menu
        .find(item => item.label === "SECTORS")
        ?.children?.find(child => child.href === `/sectors/${slug}`);
    const flySectorItem = siteConfig.flyMenu
        .find(item => item.id === "sectors")
        ?.children?.find(child => child.href === `/sectors/${slug}`);
    const title = sectorItem?.label || flySectorItem?.label || slug.charAt(0).toUpperCase() + slug.slice(1);
    const description = `Latest ${title} startup news, funding rounds, and industry analysis on StartupNews.fyi.`;
    return {
        title: `${title} News & Updates`,
        description,
        alternates: { canonical: `${SITE_URL}/sectors/${slug}` },
        openGraph: {
            title: `${title} News & Updates – StartupNews.fyi`,
            description,
            url: `${SITE_URL}/sectors/${slug}`,
            siteName: "StartupNews.fyi",
            type: "website",
        },
    };
}


export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const posts = await getPostsByCategory(slug, 100);
    const startupEvents = await getStartupEvents();

    const sectorItem = siteConfig.menu
        .find(item => item.label === "SECTORS")
        ?.children?.find(child => child.href === `/sectors/${slug}`);
    const flySectorItem = siteConfig.flyMenu
        .find(item => item.id === "sectors")
        ?.children?.find(child => child.href === `/sectors/${slug}`);
    const categoryName = sectorItem?.label || flySectorItem?.label || slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    const withThumb = posts.filter(hasThumbnail);
    const featuredPost = withThumb[0] ?? null;
    const listPosts = withThumb.slice(1);

    return (
        <div className="mvp-main-blog-wrap left relative">
            <div className="mvp-main-box">
                <div className="mvp-main-blog-cont left relative">

                    {/* Featured Post - mvp-feat6 layout (exact structure from live site) */}
                    {featuredPost && hasThumbnail(featuredPost) && (
                        <section id="mvp-feat6-wrap" className="left relative">
                            <Link href={`/post/${featuredPost.slug}`} rel="bookmark">
                                <div id="mvp-feat6-main" className="left relative">
                                    <div id="mvp-feat6-img" className="right relative">
                                        <PostImage
                                            width={1000}
                                            height={600}
                                            src={featuredPost.image}
                                            className="mvp-reg-img wp-post-image"
                                            alt={featuredPost.title}
                                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                        />
                                        <PostImage
                                            width={560}
                                            height={600}
                                            src={featuredPost.image || ''}
                                            className="mvp-mob-img wp-post-image"
                                            alt={featuredPost.title}
                                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div id="mvp-feat6-text">
                                        <h3 className="mvp-feat1-pop-head">
                                            <span className="mvp-feat1-pop-head">{categoryName}</span>
                                        </h3>
                                        <h2>{featuredPost.title}</h2>
                                        <p className="post-card-excerpt-max-3-lines">{featuredPost.excerpt}</p>
                                    </div>
                                </div>
                            </Link>
                        </section>
                    )}

                    {/* Main content + Sidebar row */}
                    <div className="mvp-main-blog-out left relative">
                        <div className="mvp-main-blog-in">
                            <div className="mvp-main-blog-body left relative">
                                {/* Latest News heading */}


                                {listPosts.length > 0 ? (
                                    <MoreNewsSection initialPosts={listPosts} availableSlugs={[]} />
                                ) : (
                                    <div className="mvp-blog-story-text left relative">
                                        <p>No posts found in this category.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar - matches live site structure */}
                        <div id="mvp-side-wrap" className="left relative theiaStickySidebar">
                            <StickySidebarContent>
                                <StartupEventsSection events={startupEvents} />
                            </StickySidebarContent>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
