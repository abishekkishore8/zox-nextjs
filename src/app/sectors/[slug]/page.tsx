import Link from "next/link";
import { getPostsByCategory, getStartupEvents } from "@/lib/data-adapter";
import { StartupEventsSection } from "@/components/StartupEventsSection";
import { StickySidebarContent } from "@/components/StickySidebarContent";
import { MoreNewsSection } from "@/components/MoreNewsSection";
import { siteConfig } from "@/lib/config";

// Enable ISR - regenerate pages every hour
export const revalidate = 3600; // 1 hour

// Allow dynamic params for sectors not pre-generated
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const sectorItem = siteConfig.menu
        .find(item => item.label === "SECTORS")
        ?.children?.find(child => child.href === `/sectors/${slug}`);
    const flySectorItem = siteConfig.flyMenu
        .find(item => item.id === "sectors")
        ?.children?.find(child => child.href === `/sectors/${slug}`);
    const title = sectorItem?.label || flySectorItem?.label || slug.charAt(0).toUpperCase() + slug.slice(1);
    return {
        title: `${title} Archives - StartupNews.fyi`,
        description: `Latest news and updates from the ${title} sector.`,
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

    const featuredPost = posts[0];
    const listPosts = posts.slice(1);

    return (
        <div className="mvp-main-blog-wrap left relative">
            <div className="mvp-main-box">
                <div className="mvp-main-blog-cont left relative">

                    {/* Featured Post - mvp-feat6 layout (exact structure from live site) */}
                    {featuredPost && (
                        <section id="mvp-feat6-wrap" className="left relative">
                            <Link href={`/post/${featuredPost.slug}`} rel="bookmark">
                                <div id="mvp-feat6-main" className="left relative">
                                    <div id="mvp-feat6-img" className="right relative">
                                        <img
                                            width={1000}
                                            height={600}
                                            src="https://s3.amazonaws.com/startupnews-media-2026/uploads/2026/02/Grok-CSAM-controversy-intensifies-1000x600.jpg"
                                            className="mvp-reg-img wp-post-image"
                                            alt={featuredPost.title}
                                            title={featuredPost.title}
                                            decoding="async"
                                        />
                                        <img
                                            width={560}
                                            height={600}
                                            src="https://s3.amazonaws.com/startupnews-media-2026/uploads/2026/02/Grok-CSAM-controversy-intensifies-560x600.jpg"
                                            className="mvp-mob-img wp-post-image"
                                            alt={featuredPost.title}
                                            title={featuredPost.title}
                                            decoding="async"
                                        />
                                    </div>
                                    <div id="mvp-feat6-text">
                                        <h3 className="mvp-feat1-pop-head">
                                            <span className="mvp-feat1-pop-head">{categoryName}</span>
                                        </h3>
                                        <h2>{featuredPost.title}</h2>
                                        <p>{featuredPost.excerpt}</p>
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
                                    <MoreNewsSection posts={listPosts} />
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
