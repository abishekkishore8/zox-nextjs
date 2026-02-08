import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getAllPosts,
  getRelatedPosts,
  getPrevNextPosts,
} from "@/lib/data";
import { Sidebar } from "@/components/Sidebar";

/** Format YYYY-MM-DD to "Month DD, YYYY" like the demo */
function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, post.categorySlug, 6);
  const { prev, next } = getPrevNextPosts(slug);

  return (
    <>
    <article id="mvp-article-wrap" itemScope itemType="http://schema.org/NewsArticle">
      <meta itemProp="mainEntityOfPage" itemType="https://schema.org/WebPage" itemID={`/post/${post.slug}`} />
      <div id="mvp-article-cont" className="left relative">
        <div className="mvp-main-box">
          <div id="mvp-post-main" className="left relative">
            <div className="mvp-post-main-out left relative">
              <div className="mvp-post-main-in">
                <div id="mvp-post-content" className="left relative">
                  {/* Template 2/3: header first (category, title, excerpt, author) - no full-width hero */}
                  <header id="mvp-post-head" className="left relative">
                    <h3 className="mvp-post-cat left relative">
                      <Link className="mvp-post-cat-link" href={`/category/${post.categorySlug}`}>
                        <span className="mvp-post-cat left">{post.category}</span>
                      </Link>
                    </h3>
                    <h1 className="mvp-post-title left entry-title" itemProp="headline">
                      {post.title}
                    </h1>
                    {post.excerpt && (
                      <span className="mvp-post-excerpt left">{post.excerpt}</span>
                    )}
                    <div className="mvp-author-info-wrap left relative">
                      <div className="mvp-author-info-thumb left relative">
                        <Image
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=92&h=92&fit=crop&q=80"
                          alt="Author"
                          width={46}
                          height={46}
                          style={{ width: 46, height: 46, objectFit: "cover", borderRadius: "50%" }}
                        />
                      </div>
                      <div className="mvp-author-info-text left relative">
                        <div className="mvp-author-info-date left relative">
                          <p>Published</p>{" "}
                          <span className="mvp-post-date">{post.timeAgo}</span>{" "}
                          <p>on</p>{" "}
                          <time className="mvp-post-date updated" itemProp="datePublished" dateTime={post.date}>
                            {formatDate(post.date)}
                          </time>
                        </div>
                        <div className="mvp-author-info-name left relative" itemProp="author" itemScope itemType="https://schema.org/Person">
                          <p>By</p>{" "}
                          <span className="author-name vcard fn author" itemProp="name">Zox News Staff</span>
                        </div>
                      </div>
                    </div>
                  </header>
                  {/* Featured image below header (content width), then Photo credit */}
                  <div id="mvp-post-feat-img" className="left relative" itemScope itemType="https://schema.org/ImageObject">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={1200}
                      height={630}
                      className="mvp-reg-img"
                      style={{ width: "100%", height: "auto", objectFit: "cover" }}
                    />
                    <Image
                      src={post.imageSmall || post.image}
                      alt={post.title}
                      width={330}
                      height={200}
                      className="mvp-mob-img"
                      style={{ width: "100%", height: "auto", objectFit: "cover" }}
                    />
                    <meta itemProp="url" content={post.image} />
                  </div>
                  <span className="mvp-feat-caption">Photo: Shutterstock</span>
                  <div id="mvp-content-wrap" className="left relative">
                    <div className="mvp-post-soc-out right relative">
                      <div id="mvp-soc-share-wrap" className="left relative">
                        <a href="#" className="mvp-share-but share-twitter" target="_blank" rel="noopener noreferrer" aria-label="Share">
                          <span className="mvp-share-but-wrap"><i className="fa fa-share" aria-hidden="true"></i></span>
                          <span className="mvp-share-but-text">Share</span>
                        </a>
                        <a href="#" className="mvp-share-but share-twitter" target="_blank" rel="noopener noreferrer" aria-label="Tweet">
                          <span className="mvp-share-but-wrap"><i className="fa-brands fa-x-twitter" aria-hidden="true"></i></span>
                          <span className="mvp-share-but-text">Tweet</span>
                        </a>
                      </div>
                      <div className="mvp-post-soc-in">
                        <div id="mvp-content-body" className="left relative">
                          <div id="mvp-content-body-top" className="left relative" />
                          <div id="mvp-content-main" className="left relative">
                              <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>
                            <div id="mvp-content-bot" className="left">
                              <div className="mvp-post-tags">
                                <span className="mvp-post-tags-header">Related Topics:</span>
                                <span itemProp="keywords">
                                  {post.tags && post.tags.length > 0
                                    ? post.tags.map((tag, i) => (
                                        <span key={tag}>{i > 0 ? " " : null}<Link href={`/category/${post.categorySlug}`}>{tag}</Link></span>
                                      ))
                                    : <Link href={`/category/${post.categorySlug}`}>{post.category}</Link>}
                                </span>
                              </div>
                              <div className="posts-nav-link" />
                              {/* Theme: #mvp-prev-next-wrap - Don't Miss (prev) | Up Next (next) side by side */}
                              <div id="mvp-prev-next-wrap" className="left relative">
                                {prev && prev.id !== post.id && (
                                  <div className="mvp-prev-post-wrap left relative">
                                    <Link href={`/post/${prev.slug}`} rel="bookmark">
                                      <div className="mvp-prev-next-cont left relative">
                                        <div className="mvp-prev-cont-out right relative">
                                          <span className="mvp-prev-arr fa fa-chevron-left left" aria-hidden="true"></span>
                                          <div className="mvp-prev-cont-in">
                                            <div className="mvp-prev-next-text left relative">
                                              <span className="mvp-prev-next-label left relative">Don&apos;t Miss</span>
                                              <p>{prev.title}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                )}
                                {next && (
                                  <div className="mvp-next-post-wrap right relative">
                                    <Link href={`/post/${next.slug}`} rel="bookmark">
                                      <div className="mvp-prev-next-cont left relative">
                                        <div className="mvp-next-cont-out left relative">
                                          <div className="mvp-next-cont-in">
                                            <div className="mvp-prev-next-text left relative">
                                              <span className="mvp-prev-next-label left relative">Up Next</span>
                                              <p>{next.title}</p>
                                            </div>
                                          </div>
                                          <span className="mvp-next-arr fa fa-chevron-right right" aria-hidden="true"></span>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                )}
                              </div>
                              {/* Theme: optional author box (mvp-author-box) */}
                              <div id="mvp-author-box-wrap" className="left relative">
                                <div className="mvp-author-box-out right relative">
                                  <div id="mvp-author-box-img" className="left relative">
                                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=92&h=92&fit=crop&q=80" alt="Author" width={60} height={60} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: "50%" }} />
                                  </div>
                                  <div className="mvp-author-box-in">
                                    <div id="mvp-author-box-head" className="left relative">
                                      <span className="mvp-author-box-name left relative">Zox News Staff</span>
                                    </div>
                                  </div>
                                </div>
                                <div id="mvp-author-box-text" className="left relative">
                                  <p>Zox News editorial team.</p>
                                </div>
                              </div>
                              <div className="mvp-org-wrap" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                                <div className="mvp-org-logo" itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
                                  <meta itemProp="url" content="/images/logos/logo-nav.png" />
                                </div>
                                <meta itemProp="name" content="Zox News" />
                              </div>
                            </div>
                          </div>
                          <div className="mvp-cont-read-wrap">
                            <div id="mvp-post-bot-ad" className="left relative">
                              <span className="mvp-ad-label">Advertisement</span>
                              <div style={{ background: "#f5f5f5", padding: 20, textAlign: "center", minHeight: 90, lineHeight: "90px" }}>
                                Ad
                              </div>
                            </div>
                            <div id="mvp-related-posts" className="left relative">
                              <h4 className="mvp-widget-home-title">
                                <span className="mvp-widget-home-title">YOU MAY LIKE</span>
                              </h4>
                              <ul className="mvp-related-posts-list left relative related">
                                {related.slice(0, 6).map((p) => (
                                  <li key={p.id} className="left relative">
                                    <Link href={`/post/${p.slug}`} rel="bookmark">
                                      <div className="mvp-related-img left relative">
                                        <Image
                                          src={p.imageSmall || p.image}
                                          alt={p.title}
                                          width={400}
                                          height={250}
                                          className="mvp-reg-img"
                                          style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                        />
                                        <Image
                                          src={p.imageSmall || p.image}
                                          alt={p.title}
                                          width={330}
                                          height={200}
                                          className="mvp-mob-img"
                                          style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                        />
                                      </div>
                                      <div className="mvp-related-text left relative">
                                        <p>{p.title}</p>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div id="mvp-comments-button" className="left relative mvp-com-click">
                              <span className="mvp-comment-but-text">Comments</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div id="mvp-side-wrap" className="left relative theiaStickySidebar">
              <Sidebar excludeIds={[post.id]} />
            </div>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
