import Link from "next/link";
import type { Metadata } from "next";
import { PostImage } from "@/components/PostImage";
import { getPostsByCategory, getCategorySectionPosts, getStartupEvents, hasThumbnail, type Post } from "@/lib/data-adapter";
import { notFound } from "next/navigation";
// import { Sidebar } from "@/components/Sidebar"; // Unused
import { StickySidebarContent } from "@/components/StickySidebarContent";
import { StartupEventsSection } from "@/components/StartupEventsSection";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const SITE_BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://startupnews.thebackend.in";

// Enable ISR - regenerate pages every hour
export const revalidate = 3600; // 1 hour

// Allow dynamic params for categories not pre-generated
export const dynamicParams = true;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const displayName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const title = `${displayName} News & Updates`;
  const description = `Latest ${displayName} startup news, funding rounds, and industry analysis on StartupNews.fyi.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_BASE}/category/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_BASE}/category/${slug}`,
      siteName: "StartupNews.fyi",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}


export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug, 20);
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  if (posts.length === 0) {
    notFound();
  }

  const section = await getCategorySectionPosts(slug);
  const featPost = section.featured && hasThumbnail(section.featured) ? section.featured : null;
  const rightPosts = section.right.filter((post): post is Post => post !== null && hasThumbnail(post));
  const listPosts = posts.filter(hasThumbnail).slice(0, 20);
  const startupEvents = await getStartupEvents();

  return (
    <div className="mvp-main-blog-wrap left relative">
      <div className="mvp-main-box">
        <div className="mvp-main-blog-cont left relative">
          <div className="mvp-main-blog-out left relative">
            <div className="mvp-main-blog-in">
              {/* Category top featured (theme mvp-cat-feat-wrap): left alt + right 2 posts */}
              {featPost && listPosts.length > 0 && (
                <div id="mvp-cat-feat-wrap" className="left relative">
                  <div className="mvp-widget-feat2-left left relative mvp-widget-feat2-left-alt">
                    <Link href={`/post/${featPost.slug}`} rel="bookmark">
                      <div className="mvp-widget-feat2-left-cont left relative">
                        {hasThumbnail(featPost) && (
                          <div className="mvp-feat1-feat-img left relative" style={{ position: "relative", height: 600 }}>
                            <PostImage
                              src={featPost.image || ''}
                              alt={featPost.title}
                              fill
                              sizes="(max-width: 767px) 100vw, 520px"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        )}
                        <div className="mvp-feat1-feat-text left relative">
                          <div className="mvp-cat-date-wrap left relative">
                            <span className="mvp-cd-cat left relative">{featPost.category}</span>
                            <span className="mvp-cd-date left relative">{featPost.timeAgo}</span>
                          </div>
                          <h2 className="mvp-stand-title post-heading-max-3-lines">{featPost.title}</h2>
                          <p className="post-card-excerpt-max-3-lines">{featPost.excerpt}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="mvp-widget-feat2-right left relative">
                    <h1 className="mvp-feat1-pop-head">
                      <span className="mvp-feat1-pop-head">{title}</span>
                    </h1>
                    <div className="mvp-widget-feat2-right-main left relative">
                      {rightPosts[0] && (
                        <Link href={`/post/${rightPosts[0].slug}`} rel="bookmark">
                          <div className="mvp-widget-feat2-right-cont left relative">
                            <div className="mvp-widget-feat2-right-img left relative">
                              <PostImage
                                src={rightPosts[0].image || ''}
                                alt={rightPosts[0].title}
                                width={400}
                                height={240}
                                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                sizes="(max-width: 767px) 100vw, 400px"
                              />
                            </div>
                            <div className="mvp-widget-feat2-right-text left relative">
                              <div className="mvp-cat-date-wrap left relative">
                                <span className="mvp-cd-cat left relative">{rightPosts[0].category}</span>
                                <span className="mvp-cd-date left relative">{rightPosts[0].timeAgo}</span>
                              </div>
                              <h2 className="post-heading-max-3-lines">{rightPosts[0].title}</h2>
                            </div>
                          </div>
                        </Link>
                      )}
                      {rightPosts[1] && (
                        <Link href={`/post/${rightPosts[1].slug}`} rel="bookmark">
                          <div className="mvp-widget-feat2-right-cont left relative">
                            <div className="mvp-widget-feat2-right-img left relative">
                              <PostImage
                                src={rightPosts[1].image || ''}
                                alt={rightPosts[1].title}
                                width={400}
                                height={240}
                                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                sizes="(max-width: 767px) 100vw, 400px"
                              />
                            </div>
                            <div className="mvp-widget-feat2-right-text left relative">
                              <div className="mvp-cat-date-wrap left relative">
                                <span className="mvp-cd-cat left relative">{rightPosts[1].category}</span>
                                <span className="mvp-cd-date left relative">{rightPosts[1].timeAgo}</span>
                              </div>
                              <h2 className="post-heading-max-3-lines">{rightPosts[1].title}</h2>
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="mvp-main-blog-body left relative">
                <ul className="mvp-blog-story-list left relative infinite-content">
                  {listPosts
                    .filter((p) => p.id !== featPost?.id && p.id !== rightPosts[0]?.id && p.id !== rightPosts[1]?.id)
                    .slice(0, 15)
                    .map((post) => (
                      <li key={post.id} className="mvp-blog-story-wrap left relative infinite-post">
                        <Link href={`/post/${post.slug}`} rel="bookmark">
                          <div className="mvp-blog-story-out relative">
                            {hasThumbnail(post) && (
                              <div className="mvp-blog-story-img left relative">
                                <PostImage
                                  src={post.image || ''}
                                  alt={post.title}
                                  width={800}
                                  height={500}
                                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                  sizes="(max-width: 767px) 100vw, 800px"
                                />
                              </div>
                            )}
                            <div className="mvp-blog-story-in">
                              <div className="mvp-blog-story-text left relative">
                                <div className="mvp-cat-date-wrap left relative">
                                  <span className="mvp-cd-cat left relative">{post.category}</span>
                                  <span className="mvp-cd-date left relative">{post.timeAgo}</span>
                                </div>
                                <h2 className="post-heading-max-3-lines">{post.title}</h2>
                                <p className="post-card-excerpt-max-3-lines">{post.excerpt}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
                <div className="mvp-inf-more-wrap left relative">
                  <Link href="/news" className="mvp-inf-more-but">
                    More Posts
                  </Link>
                  <div className="mvp-nav-links">
                    <Link href="/news">Page 1 of 1</Link>
                  </div>
                </div>
              </div>
            </div>
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
