import Link from "next/link";
import Image from "next/image";
import {
  getFeat1LeftPosts,
  getTrendingPosts,
  getMoreNewsPosts,
  getCategorySectionPosts,
  getDarkSectionPosts,
  getFeat1SectionPosts,
} from "@/lib/data";
import { HomeWidgetSection } from "@/components/HomeWidgetSection";
import { HomeDarkSection } from "@/components/HomeDarkSection";
import { HomeFeat1Section } from "@/components/HomeFeat1Section";
import { MoreNewsSection } from "@/components/MoreNewsSection";
import { StartupEventsSection } from "@/components/StartupEventsSection";
import { StickySidebarContent } from "@/components/StickySidebarContent";

export default function HomePage() {
  const { main, sub } = getFeat1LeftPosts();
  const trending = getTrendingPosts();
  const moreNews = getMoreNewsPosts([main.id, sub[0].id, sub[1].id, ...trending.map((p) => p.id)]);

  const entertainmentSection = getCategorySectionPosts("entertainment");
  const videosDarkSection = getDarkSectionPosts("sports");
  const businessSection = getCategorySectionPosts("business");
  const techFeat1Section = getFeat1SectionPosts("tech");

  return (
    <>
      {/* Featured Section - Layout 1 (like https://mvpthemes.com/zoxnews/) */}
      <div className="mvp-main-box">
        <section id="mvp-feat1-wrap" className="left relative">
          <div className="mvp-feat1-right-out left relative">
            <div className="mvp-feat1-right-in">
              <div className="mvp-feat1-main left relative">
                {/* Left column: 1 big featured + 2 sub */}
                <div className="mvp-feat1-left-wrap relative">
                  <h3 className="mvp-feat1-pop-head">
                    <span className="mvp-feat1-pop-head">Latest News</span>
                  </h3>
                  <Link href={`/post/${main.slug}`} rel="bookmark">
                    <div className="mvp-feat1-feat-wrap left relative">
                      <div className="mvp-feat1-feat-img left relative" style={{ position: "relative" }}>
                        <Image
                          src={main.image}
                          alt={main.title}
                          fill
                          className="mvp-reg-img"
                          sizes="(max-width: 768px) 100vw, 560px"
                          style={{ objectFit: "cover" }}
                        />
                        <Image
                          src={main.imageSmall || main.image}
                          alt={main.title}
                          className="mvp-mob-img"
                          width={330}
                          height={200}
                          style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        />
                      </div>
                      <div className="mvp-feat1-feat-text left relative">
                        <div className="mvp-cat-date-wrap left relative">
                          <span className="mvp-cd-cat left relative">{main.category}</span>
                          <span className="mvp-cd-date left relative">{main.timeAgo}</span>
                        </div>
                        <h2 className="mvp-stand-title">{main.title}</h2>
                        <p>{main.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="mvp-feat1-sub-wrap left relative">
                    <Link href={`/post/${sub[0].slug}`} rel="bookmark">
                      <div className="mvp-feat1-sub-cont left relative">
                        <div className="mvp-feat1-sub-img left relative">
                          <Image
                            src={sub[0].image}
                            alt={sub[0].title}
                            width={590}
                            height={354}
                            className="mvp-reg-img"
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                          <Image
                            src={sub[0].imageSmall || sub[0].image}
                            alt={sub[0].title}
                            width={330}
                            height={200}
                            className="mvp-mob-img"
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                        </div>
                        <div className="mvp-feat1-sub-text">
                          <div className="mvp-cat-date-wrap left relative">
                            <span className="mvp-cd-cat left relative">{sub[0].category}</span>
                            <span className="mvp-cd-date left relative">{sub[0].timeAgo}</span>
                          </div>
                          <h2>{sub[0].title}</h2>
                        </div>
                      </div>
                    </Link>
                    <Link href={`/post/${sub[1].slug}`} rel="bookmark">
                      <div className="mvp-feat1-sub-cont left relative">
                        <div className="mvp-feat1-sub-img left relative">
                          <Image
                            src={sub[1].image}
                            alt={sub[1].title}
                            width={590}
                            height={354}
                            className="mvp-reg-img"
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                          <Image
                            src={sub[1].imageSmall || sub[1].image}
                            alt={sub[1].title}
                            width={330}
                            height={200}
                            className="mvp-mob-img"
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                        </div>
                        <div className="mvp-feat1-sub-text">
                          <div className="mvp-cat-date-wrap left relative">
                            <span className="mvp-cd-cat left relative">{sub[1].category}</span>
                            <span className="mvp-cd-date left relative">{sub[1].timeAgo}</span>
                          </div>
                          <h2>{sub[1].title}</h2>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* Middle column: Trending */}
                <div className="mvp-feat1-mid-wrap left relative">
                  <h3 className="mvp-feat1-pop-head">
                    <span className="mvp-feat1-pop-head">Trending</span>
                  </h3>
                  <div className="mvp-feat1-pop-wrap left relative">
                    {trending.map((post) => (
                      <Link key={post.id} href={`/post/${post.slug}`} rel="bookmark">
                        <div className="mvp-feat1-pop-cont left relative">
                          <div className="mvp-feat1-pop-img left relative">
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
                          <div className="mvp-feat1-pop-text left relative">
                            <div className="mvp-cat-date-wrap left relative">
                              <span className="mvp-cd-cat left relative">{post.category}</span>
                              <span className="mvp-cd-date left relative">{post.timeAgo}</span>
                            </div>
                            <h2>{post.title}</h2>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Right column: Ad + Startup Events */}
            <div className="mvp-feat1-right-wrap left relative">
              <div className="mvp-feat1-list-ad left relative">
                <span className="mvp-ad-label">ADVERTISEMENT</span>
                <div className="mvp-feat1-list-ad-placeholder">
                  Ad placeholder
                </div>
              </div>
              <StartupEventsSection />
            </div>
          </div>
        </section>
      </div>

      {/* Homepage widget sections: Entertainment (Feat2), Videos (Dark), Business (Feat2), Tech (Feat1) */}
      <div id="mvp-home-widget-wrap" className="left relative">
        <HomeWidgetSection
          title="Entertainment"
          categorySlug="entertainment"
          featured={entertainmentSection.featured}
          right={entertainmentSection.right}
          list={entertainmentSection.list}
        />
        <HomeDarkSection
          title="Videos"
          featured={videosDarkSection.featured}
          list={videosDarkSection.list}
        />
        <HomeWidgetSection
          title="Business"
          categorySlug="business"
          featured={businessSection.featured}
          right={businessSection.right}
          list={businessSection.list}
          mainpos="middle"
        />
        <HomeFeat1Section
          title="Tech"
          top={techFeat1Section.top}
          bottom={techFeat1Section.bottom}
        />
      </div>

      {/* More News */}
      <div className="mvp-main-blog-wrap left relative">
        <div className="mvp-main-box">
          <div className="mvp-main-blog-cont left relative">
            <div className="mvp-widget-home-head">
              <h4 className="mvp-widget-home-title">
                <span className="mvp-widget-home-title">More News</span>
              </h4>
            </div>
            <div className="mvp-main-blog-out left relative">
              <div className="mvp-main-blog-in">
                <div className="mvp-main-blog-body left relative">
                  <MoreNewsSection posts={moreNews} />
                </div>
              </div>
              <div id="mvp-side-wrap" className="left relative">
                <StickySidebarContent>
                  <StartupEventsSection />
                </StickySidebarContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
