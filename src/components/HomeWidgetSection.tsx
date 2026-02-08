import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/data";

interface HomeWidgetSectionProps {
  title: string;
  categorySlug: string;
  featured: Post | null;
  right: [Post, Post];
  list: Post[];
  /** "left" = 1 big left, 2 right (Entertainment). "middle" = 2 stacked left, 1 big right (Business). */
  mainpos?: "left" | "middle";
}

/** Home Featured 2 layout: 1 big featured + 2 smaller + sidebar. mainpos "middle" swaps so 2 left, 1 big right. */
export function HomeWidgetSection({ title, categorySlug, featured, right, list, mainpos = "left" }: HomeWidgetSectionProps) {
  const leftClassName = mainpos === "middle"
    ? "mvp-widget-feat2-left left relative mvp-widget-feat2-left-alt"
    : "mvp-widget-feat2-left left relative";

  return (
    <section className="mvp-widget-home left relative">
      <div className="mvp-main-box">
        <div className="mvp-widget-home-head">
          <h4 className="mvp-widget-home-title">
            <span className="mvp-widget-home-title">{title}</span>
          </h4>
        </div>
        <div className="mvp-widget-feat2-wrap left relative">
          <div className="mvp-widget-feat2-out left relative">
            <div className="mvp-widget-feat2-in">
              <div className="mvp-widget-feat2-main left relative">
                {/* When mainpos=middle this div floats right so the 2 "right" posts appear on the left */}
                <div className={leftClassName}>
                  {featured && (
                    <Link href={`/post/${featured.slug}`} rel="bookmark">
                      <div className="mvp-widget-feat2-left-cont left relative">
                        <div className="mvp-feat1-feat-img left relative" style={{ position: "relative", height: 600 }}>
                          <Image
                            src={featured.image}
                            alt={featured.title}
                            fill
                            className="mvp-reg-img"
                            sizes="560px"
                            style={{ objectFit: "cover" }}
                          />
                          <Image
                            src={featured.imageSmall || featured.image}
                            alt={featured.title}
                            className="mvp-mob-img"
                            width={330}
                            height={200}
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                        </div>
                        <div className="mvp-feat1-feat-text left relative">
                          <div className="mvp-cat-date-wrap left relative">
                            <span className="mvp-cd-cat left relative">{featured.category}</span>
                            <span className="mvp-cd-date left relative">{featured.timeAgo}</span>
                          </div>
                          <h2 className="mvp-stand-title">{featured.title}</h2>
                          <p>{featured.excerpt}</p>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
                <div className="mvp-widget-feat2-right left relative">
                  {right[0] && (
                    <Link href={`/post/${right[0].slug}`} rel="bookmark">
                      <div className="mvp-widget-feat2-right-cont left relative">
                        <div className="mvp-widget-feat2-right-img left relative">
                          <Image
                            src={right[0].imageSmall || right[0].image}
                            alt={right[0].title}
                            width={400}
                            height={240}
                            className="mvp-reg-img"
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                          <Image
                            src={right[0].imageSmall || right[0].image}
                            alt={right[0].title}
                            width={330}
                            height={200}
                            className="mvp-mob-img"
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                        </div>
                        <div className="mvp-widget-feat2-right-text left relative">
                          <div className="mvp-cat-date-wrap left relative">
                            <span className="mvp-cd-cat left relative">{right[0].category}</span>
                            <span className="mvp-cd-date left relative">{right[0].timeAgo}</span>
                          </div>
                          <h2>{right[0].title}</h2>
                        </div>
                      </div>
                    </Link>
                  )}
                  {right[1] && (
                    <Link href={`/post/${right[1].slug}`} rel="bookmark">
                      <div className="mvp-widget-feat2-right-cont left relative">
                        <div className="mvp-widget-feat2-right-img left relative">
                          <Image
                            src={right[1].imageSmall || right[1].image}
                            alt={right[1].title}
                            width={400}
                            height={240}
                            className="mvp-reg-img"
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                          <Image
                            src={right[1].imageSmall || right[1].image}
                            alt={right[1].title}
                            width={330}
                            height={200}
                            className="mvp-mob-img"
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                        </div>
                        <div className="mvp-widget-feat2-right-text left relative">
                          <div className="mvp-cat-date-wrap left relative">
                            <span className="mvp-cd-cat left relative">{right[1].category}</span>
                            <span className="mvp-cd-date left relative">{right[1].timeAgo}</span>
                          </div>
                          <h2>{right[1].title}</h2>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="mvp-widget-feat2-side left relative">
              <div className="mvp-widget-feat2-side-ad left relative">
                <span className="mvp-ad-label">Advertisement</span>
                <div style={{ background: "#f0f0f0", padding: 20, textAlign: "center", minHeight: 250 }}>
                  Ad
                </div>
              </div>
              <div className="mvp-widget-feat2-side-list left relative">
                <div className="mvp-feat1-list left relative">
                  {list.map((post) => (
                    <Link key={post.id} href={`/post/${post.slug}`} rel="bookmark">
                      <div className="mvp-feat1-list-cont left relative">
                        <div className="mvp-feat1-list-out relative">
                          <div className="mvp-feat1-list-img left relative">
                            <Image
                              src={post.imageSmall || post.image}
                              alt={post.title}
                              width={80}
                              height={80}
                              className="mvp-reg-img"
                            />
                            <Image
                              src={post.imageSmall || post.image}
                              alt={post.title}
                              width={80}
                              height={80}
                              className="mvp-mob-img"
                            />
                          </div>
                          <div className="mvp-feat1-list-in">
                            <div className="mvp-feat1-list-text">
                              <div className="mvp-cat-date-wrap left relative">
                                <span className="mvp-cd-cat left relative">{post.category}</span>
                                <span className="mvp-cd-date left relative">{post.timeAgo}</span>
                              </div>
                              <h2>{post.title}</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href={`/category/${categorySlug}`}>
                  <div className="mvp-widget-feat2-side-more-but left relative">
                    <span className="mvp-widget-feat2-side-more">More {title}</span>
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
