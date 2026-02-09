import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/data";
import { StartupEventsSection } from "@/components/StartupEventsSection";
import { StickySidebarContent } from "@/components/StickySidebarContent";
import { MoreNewsSection } from "@/components/MoreNewsSection";
import { siteConfig } from "@/lib/config";

// Generate static params if needed, or rely on dynamic rendering
// For now, let's just make it dynamic

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Find the label from siteConfig if possible, otherwise capitalize slug
    const sectorItem = siteConfig.menu
        .find(item => item.label === "SECTORS")
        ?.children?.find(child => child.href === `/sectors/${slug}`);

    // Also check flyMenu for more comprehensive list if needed
    const flySectorItem = siteConfig.flyMenu
        .find(item => item.id === "sectors")
        ?.children?.find(child => child.href === `/sectors/${slug}`);

    const title = sectorItem?.label || flySectorItem?.label || slug.charAt(0).toUpperCase() + slug.slice(1);

    return {
        title: `${title} News - StartupNews.fyi`,
        description: `Latest news and updates from the ${title} sector.`,
    };
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const posts = getPostsByCategory(slug);

    if (!posts || posts.length === 0) {
        // Ideally show a "No posts found" page instead of 404, but for now 404 is safer if slug is invalid
        // However, if it's a valid slug with no posts, we might want to show empty state.
        // Let's stick to 404 for completely unknown routes, but we don't have a list of *all* valid slugs easily accessible here without importing config.
        // For now, if no posts, show empty state or 404? 
        // Let's show a simple "No posts found" if the category is valid but empty, or just 404?
        // Let's assume if no posts, it might be a wrong URL.
        // But better to show the page with "No posts found" if the slug looks valid.
        // Let's just proceed.
    }

    // Find the label again for display
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
        <div className="mvp-main-blog-wrap left relative mvp-main-blog-marg">
            <div className="mvp-main-box">
                <div className="mvp-main-blog-cont left relative">

                    {/* Category Header */}
                    <div className="mvp-widget-home-head">
                        <h4 className="mvp-widget-home-title">
                            <span className="mvp-widget-home-title">{categoryName}</span>
                        </h4>
                    </div>

                    <div className="mvp-main-blog-out left relative">
                        <div className="mvp-main-blog-in">
                            <div className="mvp-main-blog-body left relative">

                                {posts.length > 0 ? (
                                    <>
                                        {/* Featured Post - mvp-feat6 Layout */}
                                        <section id="mvp-feat6-wrap" className="left relative">
                                            <a href={`/news/${featuredPost.slug}`} rel="bookmark">
                                                <div id="mvp-feat6-main" className="left relative">
                                                    <div id="mvp-feat6-img" className="right relative">
                                                        <Image
                                                            src={featuredPost.image}
                                                            alt={featuredPost.title}
                                                            fill
                                                            className="mvp-reg-img object-cover"
                                                            priority
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
                                            </a>
                                        </section>

                                        {/* List of other posts */}
                                        <div className="mvp-blog-story-wrap left relative">
                                            <MoreNewsSection posts={listPosts} />
                                        </div>
                                    </>
                                ) : (
                                    <div className="mvp-blog-story-text left relative">
                                        <p>No posts found in this category.</p>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Sidebar */}
                        <div id="mvp-side-wrap" className="left relative">
                            <StickySidebarContent>
                                <StartupEventsSection />
                            </StickySidebarContent>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
