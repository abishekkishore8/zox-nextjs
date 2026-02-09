import Link from "next/link";
import Image from "next/image";
import {
  getFeat1LeftPosts,
  getTrendingPosts,
  getMoreNewsPosts,
  getCategorySectionPosts,
  getDarkSectionPosts,
  getFeat1SectionPosts,
  getPostsByCategory,
  startupEvents,
} from "@/lib/data";
import { HomeWidgetSection } from "@/components/HomeWidgetSection";
import { HomeDarkSection } from "@/components/HomeDarkSection";
import { HomeFeat1Section } from "@/components/HomeFeat1Section";
import { MoreNewsSection } from "@/components/MoreNewsSection";
import { StartupEventsSection } from "@/components/StartupEventsSection";
import { StickySidebarContent } from "@/components/StickySidebarContent";
import { EventCard } from "@/components/EventCard";

export default function HomePage() {
  const { main, sub } = getFeat1LeftPosts();
  const trending = getTrendingPosts();
  const moreNews = getMoreNewsPosts([main.id, sub[0].id, sub[1].id, ...trending.map((p) => p.id)]);

  const aiDeeptechSection = getCategorySectionPosts("ai-deeptech");
  const fintechSection = getDarkSectionPosts("fintech");
  const socialMediaSection = getCategorySectionPosts("social-media");
  const evMobilitySection = getFeat1SectionPosts("ev-mobility");

  // Block 2 fetching
  const agritechSection = getCategorySectionPosts("agritech");
  const ecommerceSection = getDarkSectionPosts("ecommerce");
  const web3Section = getCategorySectionPosts("web3");
  const healthTechSection = getFeat1SectionPosts("healthtech");

  // Block 3 fetching
  const cyberSecuritySection = getCategorySectionPosts("cyber-security");
  const spaceTechSection = getDarkSectionPosts("spacetech");
  const foodTechSection = getCategorySectionPosts("foodtech");
  const edTechSection = getFeat1SectionPosts("edtech");

  // Combine posts for mobile "Latest News" section
  const latestNewsPosts = [main, sub[0], sub[1], ...trending, ...moreNews.slice(0, 15)];

  // Get AI & DeepTech category posts for mobile section (6 total: 2 featured + 4 regular)
  const aiDeepTechPosts = getPostsByCategory("tech", 6);
  const aiDeepTechFeatured1 = aiDeepTechPosts[0] || null;
  const aiDeepTechFeatured2 = aiDeepTechPosts[1] || null;
  const aiDeepTechList = aiDeepTechPosts.slice(2, 6);

  // Get Fintech category posts for mobile section (6 total: 2 featured + 4 regular)
  const fintechPosts = getPostsByCategory("fintech", 6);
  const fintechFeatured1 = fintechPosts[0] || null;
  const fintechFeatured2 = fintechPosts[1] || null;
  const fintechList = fintechPosts.slice(2, 6);

  // Get Social Media category posts for mobile section (6 total: 2 featured + 4 regular)
  const socialMediaPosts = getPostsByCategory("social-media", 6);
  const socialMediaFeatured1 = socialMediaPosts[0] || null;
  const socialMediaFeatured2 = socialMediaPosts[1] || null;
  const socialMediaList = socialMediaPosts.slice(2, 6);

  // Get EV & Mobility category posts for mobile section (6 total: 2 featured + 4 regular)
  const evMobilityPosts = getPostsByCategory("ev-mobility", 6);
  const evMobilityFeatured1 = evMobilityPosts[0] || null;
  const evMobilityFeatured2 = evMobilityPosts[1] || null;
  const evMobilityList = evMobilityPosts.slice(2, 6);

  return (
    <>
      {/* Mobile-only: Featured Article + Latest News Section */}
      <section className="startupnews-mobile-latest-news">
        {/* Latest News Title - Below Navbar */}
        <h2 className="startupnews-mobile-section-title">Latest News</h2>

        {/* Featured Article at Top */}
        <div className="startupnews-mobile-featured">
          <Link href={`/post/${main.slug}`} rel="bookmark" className="startupnews-mobile-featured-link">
            <div className="startupnews-mobile-featured-image">
              <Image
                src={main.image}
                alt={main.title}
                fill
                className="mvp-reg-img"
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority
              />
              <Image
                src={main.imageSmall || main.image}
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
              <h1 className="startupnews-mobile-featured-title">{main.title}</h1>
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
                    <h2 className="startupnews-article-title">{post.title}</h2>
                    <p className="startupnews-article-excerpt">{post.excerpt}</p>
                  </div>
                  <div className="startupnews-article-image">
                    <Image
                      src={post.imageSmall || post.image}
                      alt={post.title}
                      width={400}
                      height={240}
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
                      <Image
                        src={post.imageSmall || post.image}
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
                    <h3 className="startupnews-popular-title-text">{post.title}</h3>
                    <span className="startupnews-popular-read-time">4 MIN READ</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mobile-only: Startup Events Section */}
      <section className="startupnews-mobile-events">
        <div className="mvp-main-box">
          <h2 className="startupnews-mobile-events-title">Startup Events</h2>
          <ul className="startupnews-events-list">
            {startupEvents.slice(0, 4).map((event) => (
              <EventCard key={event.url} event={event} />
            ))}
          </ul>
        </div>
      </section>

      {/* Mobile-only: AI & DeepTech Section */}
      {aiDeepTechFeatured1 && (
        <section className="startupnews-mobile-latest-news">
          {/* AI & DeepTech Title */}
          <h2 className="startupnews-mobile-section-title">AI & Deeptech</h2>

          {/* First Featured Article */}
          <div className="startupnews-mobile-featured">
            <Link href={`/post/${aiDeepTechFeatured1.slug}`} rel="bookmark" className="startupnews-mobile-featured-link">
              <div className="startupnews-mobile-featured-image">
                <Image
                  src={aiDeepTechFeatured1.image}
                  alt={aiDeepTechFeatured1.title}
                  fill
                  className="mvp-reg-img"
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <Image
                  src={aiDeepTechFeatured1.imageSmall || aiDeepTechFeatured1.image}
                  alt={aiDeepTechFeatured1.title}
                  className="mvp-mob-img"
                  width={400}
                  height={300}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="startupnews-mobile-featured-content">
                <div className="startupnews-mobile-featured-meta">
                  <span className="startupnews-mobile-featured-category">{aiDeepTechFeatured1.category}</span>
                  <span className="startupnews-mobile-featured-time">{aiDeepTechFeatured1.timeAgo}</span>
                </div>
                <h1 className="startupnews-mobile-featured-title">{aiDeepTechFeatured1.title}</h1>
              </div>
            </Link>
          </div>

          {/* Second Featured Article */}
          {aiDeepTechFeatured2 && (
            <div className="startupnews-mobile-featured">
              <Link href={`/post/${aiDeepTechFeatured2.slug}`} rel="bookmark" className="startupnews-mobile-featured-link">
                <div className="startupnews-mobile-featured-image">
                  <Image
                    src={aiDeepTechFeatured2.image}
                    alt={aiDeepTechFeatured2.title}
                    fill
                    className="mvp-reg-img"
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                  <Image
                    src={aiDeepTechFeatured2.imageSmall || aiDeepTechFeatured2.image}
                    alt={aiDeepTechFeatured2.title}
                    className="mvp-mob-img"
                    width={400}
                    height={300}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                </div>
                <div className="startupnews-mobile-featured-content">
                  <div className="startupnews-mobile-featured-meta">
                    <span className="startupnews-mobile-featured-category">{aiDeepTechFeatured2.category}</span>
                    <span className="startupnews-mobile-featured-time">{aiDeepTechFeatured2.timeAgo}</span>
                  </div>
                  <h1 className="startupnews-mobile-featured-title">{aiDeepTechFeatured2.title}</h1>
                </div>
              </Link>
            </div>
          )}

          {/* AI & DeepTech Article Cards (4 regular articles) */}
          <div className="mvp-main-box">
            <ul className="startupnews-articles-list">
              {aiDeepTechList.map((post) => (
                <li key={post.id} className="startupnews-article-card">
                  <Link href={`/post/${post.slug}`} rel="bookmark">
                    <div className="startupnews-article-content">
                      <div className="startupnews-article-meta">
                        <span className="startupnews-category">{post.category}</span>
                        <span className="startupnews-date">{post.timeAgo}</span>
                      </div>
                      <h2 className="startupnews-article-title">{post.title}</h2>
                      <p className="startupnews-article-excerpt">{post.excerpt}</p>
                    </div>
                    <div className="startupnews-article-image">
                      <Image
                        src={post.imageSmall || post.image}
                        alt={post.title}
                        width={400}
                        height={240}
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Mobile-only: Fintech Section */}
      {fintechFeatured1 && (
        <section className="startupnews-mobile-latest-news">
          {/* Fintech Title */}
          <h2 className="startupnews-mobile-section-title">Fintech</h2>

          {/* First Featured Article */}
          <div className="startupnews-mobile-featured">
            <Link href={`/post/${fintechFeatured1.slug}`} rel="bookmark" className="startupnews-mobile-featured-link">
              <div className="startupnews-mobile-featured-image">
                <Image
                  src={fintechFeatured1.image}
                  alt={fintechFeatured1.title}
                  fill
                  className="mvp-reg-img"
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <Image
                  src={fintechFeatured1.imageSmall || fintechFeatured1.image}
                  alt={fintechFeatured1.title}
                  className="mvp-mob-img"
                  width={400}
                  height={300}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="startupnews-mobile-featured-content">
                <div className="startupnews-mobile-featured-meta">
                  <span className="startupnews-mobile-featured-category">{fintechFeatured1.category}</span>
                  <span className="startupnews-mobile-featured-time">{fintechFeatured1.timeAgo}</span>
                </div>
                <h1 className="startupnews-mobile-featured-title">{fintechFeatured1.title}</h1>
              </div>
            </Link>
          </div>

          {/* Second Featured Article */}
          {fintechFeatured2 && (
            <div className="startupnews-mobile-featured">
              <Link href={`/post/${fintechFeatured2.slug}`} rel="bookmark" className="startupnews-mobile-featured-link">
                <div className="startupnews-mobile-featured-image">
                  <Image
                    src={fintechFeatured2.image}
                    alt={fintechFeatured2.title}
                    fill
                    className="mvp-reg-img"
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                  <Image
                    src={fintechFeatured2.imageSmall || fintechFeatured2.image}
                    alt={fintechFeatured2.title}
                    className="mvp-mob-img"
                    width={400}
                    height={300}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                </div>
                <div className="startupnews-mobile-featured-content">
                  <div className="startupnews-mobile-featured-meta">
                    <span className="startupnews-mobile-featured-category">{fintechFeatured2.category}</span>
                    <span className="startupnews-mobile-featured-time">{fintechFeatured2.timeAgo}</span>
                  </div>
                  <h1 className="startupnews-mobile-featured-title">{fintechFeatured2.title}</h1>
                </div>
              </Link>
            </div>
          )}

          {/* Fintech Article Cards (4 regular articles) */}
          <div className="mvp-main-box">
            <ul className="startupnews-articles-list">
              {fintechList.map((post) => (
                <li key={post.id} className="startupnews-article-card">
                  <Link href={`/post/${post.slug}`} rel="bookmark">
                    <div className="startupnews-article-content">
                      <div className="startupnews-article-meta">
                        <span className="startupnews-category">{post.category}</span>
                        <span className="startupnews-date">{post.timeAgo}</span>
                      </div>
                      <h2 className="startupnews-article-title">{post.title}</h2>
                      <p className="startupnews-article-excerpt">{post.excerpt}</p>
                    </div>
                    <div className="startupnews-article-image">
                      <Image
                        src={post.imageSmall || post.image}
                        alt={post.title}
                        width={400}
                        height={240}
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Mobile-only: Social Media Section */}
      {socialMediaFeatured1 && (
        <section className="startupnews-mobile-latest-news">
          {/* Social Media Title */}
          <h2 className="startupnews-mobile-section-title">Social Media</h2>

          {/* First Featured Article */}
          <div className="startupnews-mobile-featured">
            <Link href={`/post/${socialMediaFeatured1.slug}`} rel="bookmark" className="startupnews-mobile-featured-link">
              <div className="startupnews-mobile-featured-image">
                <Image
                  src={socialMediaFeatured1.image}
                  alt={socialMediaFeatured1.title}
                  fill
                  className="mvp-reg-img"
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <Image
                  src={socialMediaFeatured1.imageSmall || socialMediaFeatured1.image}
                  alt={socialMediaFeatured1.title}
                  className="mvp-mob-img"
                  width={400}
                  height={300}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="startupnews-mobile-featured-content">
                <div className="startupnews-mobile-featured-meta">
                  <span className="startupnews-mobile-featured-category">{socialMediaFeatured1.category}</span>
                  <span className="startupnews-mobile-featured-time">{socialMediaFeatured1.timeAgo}</span>
                </div>
                <h1 className="startupnews-mobile-featured-title">{socialMediaFeatured1.title}</h1>
              </div>
            </Link>
          </div>

          {/* Second Featured Article */}
          {socialMediaFeatured2 && (
            <div className="startupnews-mobile-featured">
              <Link href={`/post/${socialMediaFeatured2.slug}`} rel="bookmark" className="startupnews-mobile-featured-link">
                <div className="startupnews-mobile-featured-image">
                  <Image
                    src={socialMediaFeatured2.image}
                    alt={socialMediaFeatured2.title}
                    fill
                    className="mvp-reg-img"
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                  <Image
                    src={socialMediaFeatured2.imageSmall || socialMediaFeatured2.image}
                    alt={socialMediaFeatured2.title}
                    className="mvp-mob-img"
                    width={400}
                    height={300}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                </div>
                <div className="startupnews-mobile-featured-content">
                  <div className="startupnews-mobile-featured-meta">
                    <span className="startupnews-mobile-featured-category">{socialMediaFeatured2.category}</span>
                    <span className="startupnews-mobile-featured-time">{socialMediaFeatured2.timeAgo}</span>
                  </div>
                  <h1 className="startupnews-mobile-featured-title">{socialMediaFeatured2.title}</h1>
                </div>
              </Link>
            </div>
          )}

          {/* Social Media Article Cards (4 regular articles) */}
          <div className="mvp-main-box">
            <ul className="startupnews-articles-list">
              {socialMediaList.map((post) => (
                <li key={post.id} className="startupnews-article-card">
                  <Link href={`/post/${post.slug}`} rel="bookmark">
                    <div className="startupnews-article-content">
                      <div className="startupnews-article-meta">
                        <span className="startupnews-category">{post.category}</span>
                        <span className="startupnews-date">{post.timeAgo}</span>
                      </div>
                      <h2 className="startupnews-article-title">{post.title}</h2>
                      <p className="startupnews-article-excerpt">{post.excerpt}</p>
                    </div>
                    <div className="startupnews-article-image">
                      <Image
                        src={post.imageSmall || post.image}
                        alt={post.title}
                        width={400}
                        height={240}
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Mobile-only: EV & Mobility Section */}
      {evMobilityFeatured1 && (
        <section className="startupnews-mobile-latest-news">
          {/* EV & Mobility Title */}
          <h2 className="startupnews-mobile-section-title">EV & Mobility</h2>

          {/* First Featured Article */}
          <div className="startupnews-mobile-featured">
            <Link href={`/post/${evMobilityFeatured1.slug}`} rel="bookmark" className="startupnews-mobile-featured-link">
              <div className="startupnews-mobile-featured-image">
                <Image
                  src={evMobilityFeatured1.image}
                  alt={evMobilityFeatured1.title}
                  fill
                  className="mvp-reg-img"
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <Image
                  src={evMobilityFeatured1.imageSmall || evMobilityFeatured1.image}
                  alt={evMobilityFeatured1.title}
                  className="mvp-mob-img"
                  width={400}
                  height={300}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="startupnews-mobile-featured-content">
                <div className="startupnews-mobile-featured-meta">
                  <span className="startupnews-mobile-featured-category">{evMobilityFeatured1.category}</span>
                  <span className="startupnews-mobile-featured-time">{evMobilityFeatured1.timeAgo}</span>
                </div>
                <h1 className="startupnews-mobile-featured-title">{evMobilityFeatured1.title}</h1>
              </div>
            </Link>
          </div>

          {/* Second Featured Article */}
          {evMobilityFeatured2 && (
            <div className="startupnews-mobile-featured">
              <Link href={`/post/${evMobilityFeatured2.slug}`} rel="bookmark" className="startupnews-mobile-featured-link">
                <div className="startupnews-mobile-featured-image">
                  <Image
                    src={evMobilityFeatured2.image}
                    alt={evMobilityFeatured2.title}
                    fill
                    className="mvp-reg-img"
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                  <Image
                    src={evMobilityFeatured2.imageSmall || evMobilityFeatured2.image}
                    alt={evMobilityFeatured2.title}
                    className="mvp-mob-img"
                    width={400}
                    height={300}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                </div>
                <div className="startupnews-mobile-featured-content">
                  <div className="startupnews-mobile-featured-meta">
                    <span className="startupnews-mobile-featured-category">{evMobilityFeatured2.category}</span>
                    <span className="startupnews-mobile-featured-time">{evMobilityFeatured2.timeAgo}</span>
                  </div>
                  <h1 className="startupnews-mobile-featured-title">{evMobilityFeatured2.title}</h1>
                </div>
              </Link>
            </div>
          )}

          {/* EV & Mobility Article Cards (4 regular articles) */}
          <div className="mvp-main-box">
            <ul className="startupnews-articles-list">
              {evMobilityList.map((post) => (
                <li key={post.id} className="startupnews-article-card">
                  <Link href={`/post/${post.slug}`} rel="bookmark">
                    <div className="startupnews-article-content">
                      <div className="startupnews-article-meta">
                        <span className="startupnews-category">{post.category}</span>
                        <span className="startupnews-date">{post.timeAgo}</span>
                      </div>
                      <h2 className="startupnews-article-title">{post.title}</h2>
                      <p className="startupnews-article-excerpt">{post.excerpt}</p>
                    </div>
                    <div className="startupnews-article-image">
                      <Image
                        src={post.imageSmall || post.image}
                        alt={post.title}
                        width={400}
                        height={240}
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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

      {/* Homepage widget sections Block 1: AI & Deeptech, Fintech, Social Media, EV & Mobility */}
      <div id="mvp-home-widget-wrap" className="left relative startupnews-desktop-featured">
        <HomeWidgetSection
          title="AI & Deeptech"
          categorySlug="ai-deeptech"
          featured={aiDeeptechSection.featured}
          right={aiDeeptechSection.right}
          list={aiDeeptechSection.list}
        />
        <HomeDarkSection
          title="Fintech"
          featured={fintechSection.featured}
          list={fintechSection.list}
        />
        <HomeWidgetSection
          title="Social Media"
          categorySlug="social-media"
          featured={socialMediaSection.featured}
          right={socialMediaSection.right}
          list={socialMediaSection.list}
          mainpos="middle"
        />
        <HomeFeat1Section
          title="EV & Mobility"
          top={evMobilitySection.top}
          bottom={evMobilitySection.bottom}
        />
      </div>

      {/* Homepage widget sections Block 2: Agritech, Ecommerce, Web3, HealthTech */}
      <div id="mvp-home-widget-wrap-2" className="left relative" style={{ marginTop: "20px" }}>
        <HomeWidgetSection
          title="Agritech"
          categorySlug="agritech"
          featured={agritechSection.featured}
          right={agritechSection.right}
          list={agritechSection.list}
        />
        <HomeDarkSection
          title="Ecommerce"
          featured={ecommerceSection.featured}
          list={ecommerceSection.list}
        />
        <HomeWidgetSection
          title="Web 3.0"
          categorySlug="web3"
          featured={web3Section.featured}
          right={web3Section.right}
          list={web3Section.list}
          mainpos="middle"
        />
        <HomeFeat1Section
          title="HealthTech"
          top={healthTechSection.top}
          bottom={healthTechSection.bottom}
        />
      </div>

      {/* Homepage widget sections Block 3: Cyber Security */}
      <div id="mvp-home-widget-wrap-3" className="left relative" style={{ marginTop: "40px" }}>
        <HomeWidgetSection
          title="Cyber Security"
          categorySlug="cyber-security"
          featured={cyberSecuritySection.featured}
          right={cyberSecuritySection.right}
          list={cyberSecuritySection.list}
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
