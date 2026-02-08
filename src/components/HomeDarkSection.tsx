import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/data";

interface HomeDarkSectionProps {
  title: string;
  featured: Post | null;
  list: Post[];
}

/** Home Dark Widget: dark background, 1 large featured left + 4 list items right. Used for Videos. */
export function HomeDarkSection({ title, featured, list }: HomeDarkSectionProps) {
  return (
    <section className="mvp-widget-home left relative">
      <div className="mvp-widget-dark-wrap left relative">
        <div className="mvp-main-box">
          <div className="mvp-widget-home-head">
            <h4 className="mvp-widget-home-title">
              <span className="mvp-widget-home-title">{title}</span>
            </h4>
          </div>
          <div className="mvp-widget-dark-main left relative">
            <div className="mvp-widget-dark-left left relative">
              {featured && (
                <Link href={`/post/${featured.slug}`} rel="bookmark">
                  <div className="mvp-widget-dark-feat left relative">
                    <div className="mvp-widget-dark-feat-img left relative" style={{ position: "relative", height: 443 }}>
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="mvp-reg-img"
                        sizes="740px"
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
                    <div className="mvp-widget-dark-feat-text left relative">
                      <div className="mvp-cat-date-wrap left relative">
                        <span className="mvp-cd-cat left relative">{featured.category}</span>
                        <span className="mvp-cd-date left relative">{featured.timeAgo}</span>
                      </div>
                      <h2>{featured.title}</h2>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            <div className="mvp-widget-dark-right left relative">
              {list.slice(0, 4).map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`} rel="bookmark">
                  <div className="mvp-widget-dark-sub left relative">
                    <div className="mvp-widget-dark-sub-out right relative">
                      <div className="mvp-widget-dark-sub-img left relative">
                        <Image
                          src={post.imageSmall || post.image}
                          alt={post.title}
                          width={400}
                          height={240}
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
                      </div>
                      <div className="mvp-widget-dark-sub-in">
                        <div className="mvp-widget-dark-sub-text left relative">
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
          </div>
        </div>
      </div>
    </section>
  );
}
