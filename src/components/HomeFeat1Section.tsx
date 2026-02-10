import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/data-adapter";

interface HomeFeat1SectionProps {
  title: string;
  top: [Post, Post];
  bottom: [Post, Post, Post, Post];
}

/** Home Featured 1 layout: 2 large top + 4 smaller bottom. Used for Tech. */
export function HomeFeat1Section({ title, top, bottom }: HomeFeat1SectionProps) {
  return (
    <section className="mvp-widget-home left relative">
      <div className="mvp-main-box">
        <div className="mvp-widget-home-head">
          <h4 className="mvp-widget-home-title">
            <span className="mvp-widget-home-title">{title}</span>
          </h4>
        </div>
        <div className="mvp-widget-feat1-wrap left relative">
          <div className="mvp-widget-feat1-cont left relative">
            {top[0] && (
              <Link href={`/post/${top[0].slug}`} rel="bookmark">
                <div className="mvp-widget-feat1-top-story left relative">
                  <div className="mvp-widget-feat1-top-img left relative" style={{ position: "relative", height: 354 }}>
                    <Image
                      src={top[0].image}
                      alt={top[0].title}
                      fill
                      className="mvp-reg-img"
                      sizes="590px"
                      style={{ objectFit: "cover" }}
                    />
                    <Image
                      src={top[0].imageSmall || top[0].image}
                      alt={top[0].title}
                      className="mvp-mob-img"
                      width={330}
                      height={200}
                      style={{ width: "100%", height: "auto", objectFit: "cover" }}
                    />
                  </div>
                  <div className="mvp-widget-feat1-top-text left relative">
                    <div className="mvp-cat-date-wrap left relative">
                      <span className="mvp-cd-cat left relative">{top[0].category}</span>
                      <span className="mvp-cd-date left relative">{top[0].timeAgo}</span>
                    </div>
                    <h2>{top[0].title}</h2>
                  </div>
                </div>
              </Link>
            )}
            {top[1] && (
              <Link href={`/post/${top[1].slug}`} rel="bookmark">
                <div className="mvp-widget-feat1-top-story left relative">
                  <div className="mvp-widget-feat1-top-img left relative" style={{ position: "relative", height: 354 }}>
                    <Image
                      src={top[1].image}
                      alt={top[1].title}
                      fill
                      className="mvp-reg-img"
                      sizes="590px"
                      style={{ objectFit: "cover" }}
                    />
                    <Image
                      src={top[1].imageSmall || top[1].image}
                      alt={top[1].title}
                      className="mvp-mob-img"
                      width={330}
                      height={200}
                      style={{ width: "100%", height: "auto", objectFit: "cover" }}
                    />
                  </div>
                  <div className="mvp-widget-feat1-top-text left relative">
                    <div className="mvp-cat-date-wrap left relative">
                      <span className="mvp-cd-cat left relative">{top[1].category}</span>
                      <span className="mvp-cd-date left relative">{top[1].timeAgo}</span>
                    </div>
                    <h2>{top[1].title}</h2>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="mvp-widget-feat1-cont left relative">
            {bottom.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`} rel="bookmark">
                <div className="mvp-widget-feat1-bot-story left relative">
                  <div className="mvp-widget-feat1-bot-img left relative">
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
                  <div className="mvp-widget-feat1-bot-text left relative">
                    <div className="mvp-cat-date-wrap left relative">
                      <span className="mvp-cd-cat left relative">{post.category}</span>
                      <span className="mvp-cd-date left relative">{post.timeAgo}</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
