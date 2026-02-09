"use client";

import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/data";

interface FullArticleProps {
    post: Post;
    related?: Post[];
    prev?: Post | null;
    next?: Post | null;
}

/** Format YYYY-MM-DD to "Month DD, YYYY" like the demo */
function formatDate(dateStr: string): string {
    try {
        const d = new Date(dateStr + "T12:00:00");
        return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch {
        return dateStr;
    }
}

export function FullArticle({ post, related = [], prev, next }: FullArticleProps) {
    return (
        <article className="mvp-article-wrap" itemScope itemType="http://schema.org/NewsArticle">
            <meta itemProp="mainEntityOfPage" itemType="https://schema.org/WebPage" itemID={`/post/${post.slug}`} />
            <div id="mvp-article-cont" className="left relative">
                <div className="mvp-main-box">
                    <div id="mvp-post-main" className="left relative">
                        <div id="mvp-post-main-out" className="left relative">
                            <div id="mvp-post-main-in" className="left relative">
                                <div id="mvp-post-content" className="left relative">
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
                                            <div className="mvp-post-soc-in">
                                                <div id="mvp-content-body" className="left relative">
                                                    <div id="mvp-content-main" className="left relative">
                                                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                                    </div>
                                                    <div id="mvp-soc-share-wrap" className="left relative" style={{ display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "center", margin: "30px 0" }}>
                                                        <a href="#" className="mvp-share-but" style={{ background: "#3b5998", color: "#fff", padding: "10px 25px", fontSize: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "100px" }}><i className="fa-brands fa-facebook-f"></i></a>
                                                        <a href="#" className="mvp-share-but" style={{ background: "#00acee", color: "#fff", padding: "10px 25px", fontSize: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "100px" }}><i className="fa-brands fa-x-twitter"></i></a>
                                                        <a href="#" className="mvp-share-but" style={{ background: "#bd081c", color: "#fff", padding: "10px 25px", fontSize: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "100px" }}><i className="fa-brands fa-pinterest-p"></i></a>
                                                        <a href="#" className="mvp-share-but" style={{ background: "#666", color: "#fff", padding: "10px 25px", fontSize: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "100px" }}><i className="fa fa-envelope"></i></a>
                                                    </div>
                                                    <div id="mvp-content-bot" className="left">
                                                        <div className="mvp-post-tags" style={{ borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "30px", textAlign: "left" }}>
                                                            <span className="mvp-post-tags-header" style={{ fontWeight: 800, fontSize: "11px", textTransform: "uppercase", color: "#333" }}>Related Topics:</span>
                                                            <span itemProp="keywords" style={{ color: "#999", fontSize: "11px", marginLeft: "10px", textTransform: "uppercase" }}>
                                                                {post.tags && post.tags.length > 0
                                                                    ? post.tags.map((tag, i) => (
                                                                        <span key={tag}>{i > 0 ? " " : null}<Link href={`/category/${post.categorySlug}`} style={{ color: "#999" }}>#{tag}</Link></span>
                                                                    ))
                                                                    : <Link href={`/category/${post.categorySlug}`} style={{ color: "#999" }}>#{post.category}</Link>}
                                                            </span>
                                                        </div>
                                                        <div id="mvp-prev-next-wrap" className="left relative">
                                                            {prev && prev.id !== post.id && (
                                                                <div className="mvp-prev-post-wrap left relative">
                                                                    <Link href={`/post/${prev.slug}`} rel="bookmark" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                                                                        <span className="mvp-prev-arr fa fa-chevron-left left" aria-hidden="true" style={{ fontSize: "2rem", color: "#ccc", marginRight: "15px" }}></span>
                                                                        <div className="mvp-prev-next-text left relative">
                                                                            <span className="mvp-prev-next-label left relative">Don&apos;t Miss</span>
                                                                            <p>{prev.title}</p>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            )}
                                                            {next && (
                                                                <div className="mvp-next-post-wrap right relative">
                                                                    <Link href={`/post/${next.slug}`} rel="bookmark" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", textAlign: "right", textDecoration: "none" }}>
                                                                        <div className="mvp-prev-next-text left relative">
                                                                            <span className="mvp-prev-next-label left relative" style={{ textAlign: "right", width: "100%" }}>Up Next</span>
                                                                            <p>{next.title}</p>
                                                                        </div>
                                                                        <span className="mvp-next-arr fa fa-chevron-right right" aria-hidden="true" style={{ fontSize: "2rem", color: "#ccc", marginLeft: "15px" }}></span>
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </div>
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
                                                    </div>
                                                </div>
                                                {related.length > 0 && (
                                                    <div className="mvp-cont-read-wrap">
                                                        <div id="mvp-related-posts" className="left relative">
                                                            <h4 className="mvp-widget-home-title">
                                                                <span className="mvp-widget-home-title">YOU MAY LIKE</span>
                                                            </h4>
                                                            <ul className="mvp-related-posts-list left relative related">
                                                                {related.map((p) => (
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
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
