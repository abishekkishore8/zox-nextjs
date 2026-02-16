import Link from "next/link";
import { PostImage } from "@/components/PostImage";
import {
  getFeat1LeftPosts,
  getTrendingPosts,
  getMoreNewsPosts,
  getMoreNewsSlugs,
  getCategorySectionPosts,
  getDarkSectionPosts,
  getFeat1SectionPosts,
  getPostsByCategory,
  getStartupEvents,
  getLatestNewsPosts,
  onlyPostsWithImage,
  getPostImage,
  getCategoryDisplayName,
  HOME_WIDGET_CATEGORY_MAP,
  type Post,
  hasThumbnail,
} from "@/lib/data-adapter";
import { MobileCategorySection } from "@/components/MobileCategorySection";
import { HomeWidgetSection } from "@/components/HomeWidgetSection";
import { HomeDarkSection } from "@/components/HomeDarkSection";
import { HomeFeat1Section } from "@/components/HomeFeat1Section";
import { MoreNewsSection } from "@/components/MoreNewsSection";
import { StartupEventsSection } from "@/components/StartupEventsSection";
import { StickySidebarContent } from "@/components/StickySidebarContent";
import { EventsCarousel } from "@/components/EventsCarousel";
import { BannerCarouselClient } from "@/components/BannerCarouselClient";

// ISR: serve cached HTML for 60s so CDN/edge can serve in ~0.01s when cached
export const revalidate = 60;

export default async function HomePage() {
  const categorySlugs = [
    "artificial-intelligence", "fintech", "social-media", "mobility",
    "agritech", "ecommerce", "web-3", "health-tech",
    "cyber-security", "space-tech", "foodtech", "edtech"
  ];

  // Batch 1: parallel fetch all independent data (one round-trip to cache/DB)
  const batch1 = await Promise.all([
    getFeat1LeftPosts(),
    getTrendingPosts(),
    getStartupEvents(),
    ...categorySlugs.map((slug) => getPostsByCategory(slug, 4)),
    getCategorySectionPosts("artificial-intelligence"),
    getDarkSectionPosts("fintech"),
    getCategorySectionPosts("social-media"),
    getFeat1SectionPosts("mobility"),
    getCategorySectionPosts("agritech"),
    getDarkSectionPosts("ecommerce"),
    getCategorySectionPosts("web-3"),
    getFeat1SectionPosts("health-tech"),
    getCategorySectionPosts("cyber-security"),
    getDarkSectionPosts("space-tech"),
    getCategorySectionPosts("foodtech"),
    getFeat1SectionPosts("edtech"),
    getLatestNewsPosts(25),
    ...categorySlugs.map((slug) => getCategoryDisplayName(slug, HOME_WIDGET_CATEGORY_MAP[slug] ?? slug)),
  ]);

  const feat1Result = batch1[0] as Awaited<ReturnType<typeof getFeat1LeftPosts>>;
  const trending = batch1[1] as Post[];
  const startupEvents = batch1[2] as Awaited<ReturnType<typeof getStartupEvents>>;
  const mobileCategoryData = batch1.slice(3, 15) as Post[][];
  const aiDeeptechSection = batch1[15] as Awaited<ReturnType<typeof getCategorySectionPosts>>;
  const fintechSection = batch1[16] as Awaited<ReturnType<typeof getDarkSectionPosts>>;
  const socialMediaSection = batch1[17] as Awaited<ReturnType<typeof getCategorySectionPosts>>;
  const evMobilitySection = batch1[18] as Awaited<ReturnType<typeof getFeat1SectionPosts>>;
  const agritechSection = batch1[19] as Awaited<ReturnType<typeof getCategorySectionPosts>>;
  const ecommerceSection = batch1[20] as Awaited<ReturnType<typeof getDarkSectionPosts>>;
  const web3Section = batch1[21] as Awaited<ReturnType<typeof getCategorySectionPosts>>;
  const healthTechSection = batch1[22] as Awaited<ReturnType<typeof getFeat1SectionPosts>>;
  const cyberSecuritySection = batch1[23] as Awaited<ReturnType<typeof getCategorySectionPosts>>;
  const spaceTechSection = batch1[24] as Awaited<ReturnType<typeof getDarkSectionPosts>>;
  const foodTechSection = batch1[25] as Awaited<ReturnType<typeof getCategorySectionPosts>>;
  const edTechSection = batch1[26] as Awaited<ReturnType<typeof getFeat1SectionPosts>>;
  const latestFromListing = batch1[27] as Post[];
  const categoryTitlesMap = batch1.slice(28, 40) as string[];

  const { main, sub } = feat1Result;
  const excludeIds = [main.id, sub[0].id, sub[1].id, ...trending.map((p) => p.id)];

  // Batch 2: more news (depends on excludeIds only)
  const [moreNews, moreNewsSlugs] = await Promise.all([
    getMoreNewsPosts(excludeIds, 15),
    getMoreNewsSlugs(excludeIds),
  ]);

  const mobilePostsMap: Record<string, Post[]> = {};
  categorySlugs.forEach((slug, index) => {
    mobilePostsMap[slug] = mobileCategoryData[index];
  });

  const titles: Record<string, string> = {};
  categorySlugs.forEach((slug, index) => {
    titles[slug] = categoryTitlesMap[index];
  });

  // Specific title variables for desktop widgets (backward compat with existing code below)
  const titleAiDeeptech = titles["artificial-intelligence"];
  const titleFintech = titles["fintech"];
  const titleSocialMedia = titles["social-media"];
  const titleEvMobility = titles["mobility"];
  const titleAgritech = titles["agritech"];
  const titleEcommerce = titles["ecommerce"];
  const titleWeb3 = titles["web-3"];
  const titleHealthTech = titles["health-tech"];
  const titleCyberSecurity = titles["cyber-security"];
  const titleSpaceTech = titles["space-tech"];
  const titleFoodTech = titles["foodtech"];
  const titleEdTech = titles["edtech"];

  // Latest News: use listing so posts with image only in content get thumbnail; fallback to combined list
  const latestNewsPosts = latestFromListing.length > 0 ? latestFromListing : onlyPostsWithImage([main, sub[0], sub[1], ...trending, ...moreNews.slice(0, 15)]);

  // Helper to ensure we have enough posts for mobile sections (2 featured + 2 list)
  const fillMobileSection = (catPosts: Post[], allPosts: Post[]) => {
    const withImage = onlyPostsWithImage(catPosts);
    const needed = 4; // 2 big featured cards + 2 small list cards
    if (withImage.length >= needed) return withImage.slice(0, needed);

    const usedIds = new Set(withImage.map(p => p.id));
    const extra = allPosts.filter(p => !usedIds.has(p.id) && hasThumbnail(p)).slice(0, needed - withImage.length);
    return [...withImage, ...extra];
  };

  // Get full list of available posts for fallbacks
  const allAvailablePosts = [main, sub[0], sub[1], ...trending, ...moreNews];

  // Prepare data for all 12 mobile sections
  const mobileSections = categorySlugs.map(slug => ({
    slug,
    title: titles[slug],
    posts: fillMobileSection(mobilePostsMap[slug] || [], allAvailablePosts)
  }));

  return (
    <>
    <BannerCarouselClient />
      {/* Mobile-only: Featured Article + Latest News Section */}
      <section className="startupnews-mobile-latest-news">
        {/* Latest News Title - Below Navbar */}
        <h2 className="startupnews-mobile-section-title">Latest News</h2>

        {/* Featured Article at Top */}
        <div className="startupnews-mobile-featured">
          <Link href={`/post/${main.slug}`} rel="bookmark" className="startupnews-mobile-featured-link">
            <div className="startupnews-mobile-featured-image">
              <PostImage
                src={getPostImage(main)}
                alt={main.title}
                fill
                className="mvp-reg-img"
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority
              />
              <PostImage
                src={getPostImage(main)}
                alt={main.title}
                className="mvp-mob-img"
                width={400}
                height={300}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                priority
              />
            </div>
            <div className="startupnews-mobile-featured-content">
              <div className="startupnews-mobile-featured-meta">
                <span className="startupnews-mobile-featured-category">{main.category}</span>
                <span className="startupnews-mobile-featured-time">{main.timeAgo}</span>
              </div>
              <h1 className="startupnews-mobile-featured-title post-heading-max-3-lines">{main.title}</h1>
            </div>
          </Link>
        </div>

        {/* Latest News Article Cards */}
        <div className="mvp-main-box">
          <ul className="startupnews-articles-list">
            {latestNewsPosts.slice(1, 7).map((post) => (
              <li key={post.id} className="startupnews-article-card">
                <Link href={`/post/${post.slug}`} rel="bookmark">
                  <div className="startupnews-article-content">
                    <div className="startupnews-article-meta">
                      <span className="startupnews-category">{post.category}</span>
                      <span className="startupnews-date">{post.timeAgo}</span>
                    </div>
                    <h2 className="startupnews-article-title post-heading-max-3-lines">{post.title}</h2>
                    <p className="startupnews-article-excerpt">{post.excerpt}</p>
                  </div>
                  <div className="startupnews-article-image">
                    <PostImage
                      src={getPostImage(post)}
                      alt={post.title}
                      width={600}
                      height={360}
                      sizes="(max-width: 767px) 100vw, 400px"
                      style={{ width: "100%", height: "auto", objectFit: "cover" }}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mobile-only: Most Popular Section */}
      <section className="startupnews-mobile-most-popular">
        <div className="mvp-main-box">
          <h2 className="startupnews-mobile-popular-title">Trending</h2>
          <ul className="startupnews-popular-list">
            {trending.slice(0, 5).map((post, index) => (
              <li key={post.id} className="startupnews-popular-card">
                <Link href={`/post/${post.slug}`} rel="bookmark">
                  <div className="startupnews-popular-image-wrapper">
                    <div className="startupnews-popular-image">
                      <PostImage
                        src={getPostImage(post)}
                        alt={post.title}
                        width={120}
                        height={120}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div className="startupnews-popular-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="startupnews-popular-content">
                    <h3 className="startupnews-popular-title-text post-heading-max-3-lines">{post.title}</h3>
                    <span className="startupnews-popular-read-time">4 MIN READ</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mobile-only: Startup Events Section - Carousel */}
      <section className="startupnews-mobile-events">
        <div className="mvp-main-box">
          <EventsCarousel events={startupEvents} maxEvents={10} />
        </div>
      </section>

      {/* Mobile-only: All 12 Category Sections */}
      {mobileSections.map((section) => (
        <MobileCategorySection key={section.slug} title={section.title} posts={section.posts} slug={section.slug} />
      ))}

      {/* Mobile-only: More News Section */}
      <section className="startupnews-mobile-more-news">
        <div className="mvp-main-box">
          <h2 className="startupnews-mobile-section-title">More News</h2>
          <div className="startupnews-mobile-more-news-content">
            <MoreNewsSection initialPosts={moreNews} availableSlugs={moreNewsSlugs} />
          </div>
        </div>
      </section>

      {/* Desktop: Original Featured Section - Layout 1 */}
      <div className="mvp-main-box startupnews-desktop-featured">
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
                        <PostImage
                          src={getPostImage(main)}
                          alt={main.title}
                          fill
                          className="mvp-reg-img"
                          sizes="(max-width: 768px) 100vw, 560px"
                          style={{ objectFit: "cover" }}
                        />
                        <PostImage
                          src={getPostImage(main)}
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
                        <h2 className="mvp-stand-title post-heading-max-3-lines">{main.title}</h2>
                        <p>{main.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="mvp-feat1-sub-wrap left relative">
                    <Link href={`/post/${sub[0].slug}`} rel="bookmark">
                      <div className="mvp-feat1-sub-cont left relative">
                        <div className="mvp-feat1-sub-img left relative">
                          <PostImage
                            src={getPostImage(sub[0])}
                            alt={sub[0].title}
                            width={590}
                            height={354}
                            className="mvp-reg-img"
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                          <PostImage
                            src={getPostImage(sub[0])}
                            alt={sub[0].title}
                            className="mvp-mob-img"
                            width={330}
                            height={200}
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                        </div>
                        <div className="mvp-feat1-sub-text">
                          <div className="mvp-cat-date-wrap left relative">
                            <span className="mvp-cd-cat left relative">{sub[0].category}</span>
                            <span className="mvp-cd-date left relative">{sub[0].timeAgo}</span>
                          </div>
                          <h2 className="post-heading-max-3-lines">{sub[0].title}</h2>
                        </div>
                      </div>
                    </Link>
                    <Link href={`/post/${sub[1].slug}`} rel="bookmark">
                      <div className="mvp-feat1-sub-cont left relative">
                        <div className="mvp-feat1-sub-img left relative">
                          <PostImage
                            src={getPostImage(sub[1])}
                            alt={sub[1].title}
                            width={590}
                            height={354}
                            className="mvp-reg-img"
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                          <PostImage
                            src={getPostImage(sub[1])}
                            alt={sub[1].title}
                            className="mvp-mob-img"
                            width={330}
                            height={200}
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                        </div>
                        <div className="mvp-feat1-sub-text">
                          <div className="mvp-cat-date-wrap left relative">
                            <span className="mvp-cd-cat left relative">{sub[1].category}</span>
                            <span className="mvp-cd-date left relative">{sub[1].timeAgo}</span>
                          </div>
                          <h2 className="post-heading-max-3-lines">{sub[1].title}</h2>
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
                            <PostImage
                              src={getPostImage(post)}
                              alt={post.title}
                              width={600}
                              height={360}
                              className="mvp-reg-img"
                              sizes="(max-width: 767px) 100vw, 400px"
                              style={{ width: "100%", height: "auto", objectFit: "cover" }}
                            />
                            <PostImage
                              src={getPostImage(post)}
                              alt={post.title}
                              width={600}
                              height={360}
                              className="mvp-mob-img"
                              sizes="(max-width: 767px) 100vw, 330px"
                              style={{ width: "100%", height: "auto", objectFit: "cover" }}
                            />
                          </div>
                          <div className="mvp-feat1-pop-text left relative">
                            <div className="mvp-cat-date-wrap left relative">
                              <span className="mvp-cd-cat left relative">{post.category}</span>
                              <span className="mvp-cd-date left relative">{post.timeAgo}</span>
                            </div>
                            <h2 className="post-heading-max-3-lines">{post.title}</h2>
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
              <StartupEventsSection events={startupEvents} />
            </div>
          </div>
        </section>
      </div>

      {/* Homepage widget sections Block 1: category headings from DB */}
      <div id="mvp-home-widget-wrap" className="mvp-home-widget-block left relative startupnews-desktop-featured">
        <HomeWidgetSection
          title={titleAiDeeptech}
          categorySlug="ai-deeptech"
          featured={aiDeeptechSection.featured}
          right={aiDeeptechSection.right}
          list={aiDeeptechSection.list}
        />
        <HomeDarkSection
          title={titleFintech}
          categorySlug="fintech"
          featured={fintechSection.featured}
          list={fintechSection.list}
        />
        <HomeWidgetSection
          title={titleSocialMedia}
          categorySlug="social-media"
          featured={socialMediaSection.featured}
          right={socialMediaSection.right}
          list={socialMediaSection.list}
          mainpos="middle"
        />
        <HomeFeat1Section
          title={titleEvMobility}
          categorySlug="mobility"
          top={evMobilitySection.top}
          bottom={evMobilitySection.bottom}
        />
      </div>

      {/* Homepage widget sections Block 2: category headings from DB */}
      <div className="mvp-home-widget-block left relative startupnews-desktop-featured">
        <HomeWidgetSection
          title={titleAgritech}
          categorySlug="agritech"
          featured={agritechSection.featured}
          right={agritechSection.right}
          list={agritechSection.list}
        />
        <HomeDarkSection
          title={titleEcommerce}
          categorySlug="ecommerce"
          featured={ecommerceSection.featured}
          list={ecommerceSection.list}
        />
        <HomeWidgetSection
          title={titleWeb3}
          categorySlug="web3"
          featured={web3Section.featured}
          right={web3Section.right}
          list={web3Section.list}
          mainpos="middle"
        />
        <HomeFeat1Section
          title={titleHealthTech}
          categorySlug="health-tech"
          top={healthTechSection.top}
          bottom={healthTechSection.bottom}
        />
      </div>

      {/* Homepage widget sections Block 3: category headings from DB */}
      <div className="mvp-home-widget-block left relative startupnews-desktop-featured">
        <HomeWidgetSection
          title={titleCyberSecurity}
          categorySlug="cyber-security"
          featured={cyberSecuritySection.featured}
          right={cyberSecuritySection.right}
          list={cyberSecuritySection.list}
        />
        <HomeDarkSection
          title={titleSpaceTech}
          categorySlug="space-tech"
          featured={spaceTechSection.featured}
          list={spaceTechSection.list}
        />
        <HomeWidgetSection
          title={titleFoodTech}
          categorySlug="foodtech"
          featured={foodTechSection.featured}
          right={foodTechSection.right}
          list={foodTechSection.list}
          mainpos="middle"
        />
        <HomeFeat1Section
          title={titleEdTech}
          categorySlug="edtech"
          top={edTechSection.top}
          bottom={edTechSection.bottom}
        />
      </div>

      {/* More News */}
      <div className="mvp-main-blog-wrap left relative startupnews-desktop-featured">
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
                  <MoreNewsSection initialPosts={moreNews} availableSlugs={moreNewsSlugs} />
                </div>
              </div>
              <div id="mvp-side-wrap" className="left relative">
                <StickySidebarContent>
                  <StartupEventsSection events={startupEvents} />
                </StickySidebarContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
