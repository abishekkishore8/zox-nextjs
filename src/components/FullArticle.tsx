"use client";

import Link from "next/link";
import Image from "next/image";
import { PostImage } from "@/components/PostImage";
import type { Post } from "@/lib/data-adapter";
import { getPostImage, hasThumbnail, toNewsBrief } from "@/lib/post-utils";

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
                                        <h1 className="mvp-post-title left entry-title post-heading-max-3-lines" itemProp="headline">
                                            {post.title}
                                        </h1>
                                        <div className="mvp-author-info-wrap left relative">
                                            {(post.sourceName || post.sourceAuthor || post.sourceLogoUrl) ? (
                                                <>
                                                    <div className="mvp-author-info-thumb left relative" style={{ width: 46, height: 46, borderRadius: "8px", overflow: "hidden", flexShrink: 0, backgroundColor: "#f0f0f0" }}>
                                                        {post.sourceLogoUrl ? (
                                                            <img
                                                                src={post.sourceLogoUrl}
                                                                alt={post.sourceName ? `${post.sourceName} logo` : "Source logo"}
                                                                width={46}
                                                                height={46}
                                                                style={{ width: 46, height: 46, objectFit: "contain" }}
                                                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                            />
                                                        ) : (
                                                            <span style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", color: "#888" }} aria-hidden>©</span>
                                                        )}
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
                                                            {post.sourceName && (
                                                                <span className="mvp-source-prefix" style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#666", marginBottom: "2px" }}>
                                                                    Via {post.sourceName}
                                                                </span>
                                                            )}
                                                            <span className="author-name vcard fn author" itemProp="name">
                                                                {post.sourceAuthor || post.sourceName || "Source"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
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
                                                </>
                                            )}
                                        </div>
                                    </header>
                                    <div id="mvp-post-feat-img" className="left relative" itemScope itemType="https://schema.org/ImageObject">
                                        <PostImage
                                            src={post.image}
                                            alt={post.title}
                                            width={1200}
                                            height={630}
                                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                        />
                                        <meta itemProp="url" content={post.image} />
                                    </div>
                                    <div id="mvp-content-wrap" className="left relative">
                                        <div className="mvp-post-soc-out right relative">
                                            <div className="mvp-post-soc-in">
                                                <div id="mvp-content-body" className="left relative">
                                                    <div id="mvp-content-main" className="left relative">
                                                        {/* Single post page: show news brief only (no full HTML, no {ad} etc.) */}
                                                        {toNewsBrief(post.excerpt) ? (
                                                            <p className="mvp-post-brief" style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "#333", textAlign: 'justify' }}>{toNewsBrief(post.excerpt)}</p>
                                                        ) : (
                                                            <p className="mvp-content-unavailable" style={{ color: "#666" }}>Summary not available.</p>
                                                        )}
                                                        {post.sourceUrl && (
                                                            <p className="mvp-post-source" style={{ marginTop: "1.5rem" }}>
                                                                <a
                                                                    href={post.sourceUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="mvp-source-button"
                                                                    style={{
                                                                        display: "inline-flex",
                                                                        alignItems: "center",
                                                                        gap: "0.5rem",
                                                                        padding: "0.6rem 1.25rem",
                                                                        fontSize: "0.9rem",
                                                                        fontWeight: 600,
                                                                        color: "#fff",
                                                                        backgroundColor: "#111",
                                                                        border: "none",
                                                                        borderRadius: "9999px",
                                                                        textDecoration: "none",
                                                                        cursor: "pointer",
                                                                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                                                        transition: "background-color 0.2s, transform 0.15s",
                                                                    }}
                                                                >
                                                                    <span style={{ letterSpacing: "0.02em" }}>View source</span>
                                                                    <i className="fa fa-external-link" style={{ fontSize: "0.8em", opacity: 0.9 }} aria-hidden />
                                                                </a>
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div id="mvp-soc-share-wrap" className="left relative" style={{ display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "center", margin: "30px 0" }}>
                                                        <a href="#" className="mvp-share-but" style={{ background: "#3b5998", color: "#fff", padding: "10px 25px", fontSize: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "100px" }} aria-label="Share on Facebook"><i className="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
                                                        <a href="#" className="mvp-share-but" style={{ background: "#00acee", color: "#fff", padding: "10px 25px", fontSize: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "100px" }} aria-label="Share on Twitter"><i className="fa-brands fa-x-twitter" aria-hidden="true"></i></a>
                                                        <a href="#" className="mvp-share-but" style={{ background: "#bd081c", color: "#fff", padding: "10px 25px", fontSize: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "100px" }} aria-label="Share on Pinterest"><i className="fa-brands fa-pinterest-p" aria-hidden="true"></i></a>
                                                        <a href="#" className="mvp-share-but" style={{ background: "#666", color: "#fff", padding: "10px 25px", fontSize: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "100px" }} aria-label="Share via Email"><i className="fa fa-envelope" aria-hidden="true"></i></a>
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
                                                    </div>
                                                </div>
                                                {related.length > 0 && (
                                                    <div className="mvp-cont-read-wrap">
                                                        <div id="mvp-related-posts" className="left relative">
                                                            <h4 className="mvp-widget-home-title">
                                                                <span className="mvp-widget-home-title">YOU MAY LIKE</span>
                                                            </h4>
                                                            <ul className="mvp-related-posts-list left relative related">
                                                                {related.filter(hasThumbnail).map((p) => (
                                                                    <li key={p.id} className="left relative">
                                                                        <Link href={`/post/${p.slug}`} rel="bookmark">
                                                                            {hasThumbnail(p) && (
                                                                                <div className="mvp-related-img left relative">
                                                                                    <PostImage
                                                                                        src={getPostImage(p)}
                                                                                        alt={p.title}
                                                                                        fill
                                                                                        className="mvp-related-thumb"
                                                                                        sizes="(max-width: 767px) 160px, 640px"
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                            <div className="mvp-related-text left relative">
                                                                                <p className="post-heading-max-3-lines">{p.title}</p>
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
