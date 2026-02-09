export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  date: string;
  timeAgo: string;
  image: string;
  imageSmall?: string;
  format?: "standard" | "video" | "gallery";
  featured?: boolean;
  /** Optional topic/tag names for "Related Topics" (demo shows multiple links) */
  tags?: string[];
}

const placeholderImage = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80";
const placeholderSmall = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80";

export const mockPosts: Post[] = [
  {
    id: "1",
    slug: "breaking-news-headline-dominates-world-today",
    title: "Breaking: Major Headline Dominates World News Today",
    excerpt: "The latest developments have captured global attention as leaders respond to the unprecedented situation unfolding across multiple regions.",
    content: "<p>Full article content would go here. This is a sample post for the Zox News theme clone.</p><p>Additional paragraphs and rich content.</p>",
    category: "World",
    categorySlug: "world",
    date: "2025-02-08",
    timeAgo: "2 hours ago",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&q=80",
    imageSmall: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "2",
    slug: "technology-giants-announce-new-innovations",
    title: "Technology Giants Announce Groundbreaking New Innovations",
    excerpt: "Industry leaders unveil next-generation products set to transform how we work and communicate in the digital age.",
    content: "<p>Tech content here.</p>",
    category: "Tech",
    categorySlug: "tech",
    date: "2025-02-08",
    timeAgo: "4 hours ago",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "3",
    slug: "sports-championship-ends-dramatic-final",
    title: "Championship Ends in Dramatic Final Seconds",
    excerpt: "Fans witnessed an unforgettable finish as the underdogs secured victory in the closing moments of the game.",
    content: "<p>Sports content.</p>",
    category: "Sports",
    categorySlug: "sports",
    date: "2025-02-07",
    timeAgo: "1 day ago",
    image: "https://images.unsplash.com/photo-1461896836934-fff60766ef32?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1461896836934-fff60766ef32?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "4",
    slug: "political-summit-addresses-global-challenges",
    title: "Political Summit Addresses Global Challenges",
    excerpt: "World leaders convene to discuss climate, economy, and security in one of the most anticipated gatherings of the year.",
    content: "<p>Politics content.</p>",
    category: "Politics",
    categorySlug: "politics",
    date: "2025-02-07",
    timeAgo: "1 day ago",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80",
    format: "standard",
    featured: true,
  },
  {
    id: "5",
    slug: "entertainment-awards-show-highlights",
    title: "Entertainment Awards Show Highlights Best of the Year",
    excerpt: "Stars gathered for the annual ceremony celebrating outstanding achievements in film, music, and television.",
    content: "<p>Entertainment content.</p>",
    category: "Entertainment",
    categorySlug: "entertainment",
    date: "2025-02-06",
    timeAgo: "2 days ago",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
    imageSmall: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80",
    format: "video",
    featured: true,
  },
  {
    id: "6",
    slug: "more-news-story-one",
    title: "Scientists Discover New Species in Deep Ocean Expedition",
    excerpt: "Marine biologists report finding previously unknown life forms during a groundbreaking deep-sea mission.",
    content: "<p>Science content.</p>",
    category: "Science",
    categorySlug: "science",
    date: "2025-02-06",
    timeAgo: "2 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "7",
    slug: "more-news-story-two",
    title: "Economy Shows Signs of Recovery in Latest Report",
    excerpt: "New data suggests positive trends as markets respond to recent policy changes and consumer confidence grows.",
    content: "<p>Business content.</p>",
    category: "Business",
    categorySlug: "business",
    date: "2025-02-05",
    timeAgo: "3 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
    tags: ["Business", "Economy", "Markets", "Recovery"],
  },
  {
    id: "8",
    slug: "more-news-story-three",
    title: "Local Community Rallies for Environmental Initiative",
    excerpt: "Residents join forces to support green projects and sustainable living efforts in the region.",
    content: "<p>Local content.</p>",
    category: "Local",
    categorySlug: "local",
    date: "2025-02-05",
    timeAgo: "3 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "9",
    slug: "more-news-story-four",
    title: "Health Experts Share Tips for Winter Wellness",
    excerpt: "Doctors recommend practical steps to stay healthy during the cold season and flu peak.",
    content: "<p>Health content.</p>",
    category: "Health",
    categorySlug: "health",
    date: "2025-02-04",
    timeAgo: "4 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "10",
    slug: "more-news-story-five",
    title: "Education Reform Bill Passes Key Committee",
    excerpt: "Legislators advance measure that could reshape curriculum and funding for schools nationwide.",
    content: "<p>Education content.</p>",
    category: "Education",
    categorySlug: "education",
    date: "2025-02-04",
    timeAgo: "4 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "11",
    slug: "more-news-story-six",
    title: "Global Markets React to Central Bank Decisions",
    excerpt: "Investors weigh policy shifts as major economies signal changes in interest rates.",
    content: "<p>Markets content.</p>",
    category: "Business",
    categorySlug: "business",
    date: "2025-02-03",
    timeAgo: "5 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "12",
    slug: "more-news-story-seven",
    title: "New Study Links Diet to Long-Term Health Outcomes",
    excerpt: "Research highlights the impact of nutrition on aging and disease prevention.",
    content: "<p>Health content.</p>",
    category: "Health",
    categorySlug: "health",
    date: "2025-02-03",
    timeAgo: "5 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "13",
    slug: "more-news-story-eight",
    title: "Renewable Energy Projects Get Green Light",
    excerpt: "Officials approve major investments in solar and wind infrastructure.",
    content: "<p>Environment content.</p>",
    category: "Science",
    categorySlug: "science",
    date: "2025-02-02",
    timeAgo: "6 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "14",
    slug: "more-news-story-nine",
    title: "Film Festival Announces Lineup for Spring Edition",
    excerpt: "Organizers reveal the selection of features and documentaries for the upcoming event.",
    content: "<p>Entertainment content.</p>",
    category: "Entertainment",
    categorySlug: "entertainment",
    date: "2025-02-02",
    timeAgo: "6 days ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "15",
    slug: "more-news-story-ten",
    title: "Local Schools Adopt New Digital Learning Tools",
    excerpt: "District rolls out updated platforms to support hybrid and remote instruction.",
    content: "<p>Education content.</p>",
    category: "Education",
    categorySlug: "education",
    date: "2025-02-01",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "16",
    slug: "more-news-story-eleven",
    title: "Startup Raises Record Funding for AI Platform",
    excerpt: "Venture capital backs company focused on enterprise automation and analytics.",
    content: "<p>Tech content.</p>",
    category: "Tech",
    categorySlug: "tech",
    date: "2025-02-01",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "17",
    slug: "more-news-story-twelve",
    title: "Community Garden Initiative Expands to New Neighborhoods",
    excerpt: "Volunteers and partners bring urban farming to more residents this season.",
    content: "<p>Local content.</p>",
    category: "Local",
    categorySlug: "local",
    date: "2025-01-31",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "18",
    slug: "more-news-story-thirteen",
    title: "Olympic Committee Updates Qualification Rules",
    excerpt: "Athletes and federations react to revised criteria for upcoming games.",
    content: "<p>Sports content.</p>",
    category: "Sports",
    categorySlug: "sports",
    date: "2025-01-31",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "19",
    slug: "more-news-story-fourteen",
    title: "Diplomatic Talks Resume Between Key Nations",
    excerpt: "Officials meet to discuss trade, security, and climate cooperation.",
    content: "<p>Politics content.</p>",
    category: "Politics",
    categorySlug: "politics",
    date: "2025-01-30",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
  {
    id: "20",
    slug: "more-news-story-fifteen",
    title: "Researchers Publish Breakthrough in Battery Technology",
    excerpt: "New design could extend range and lifespan of electric vehicles.",
    content: "<p>Science content.</p>",
    category: "Science",
    categorySlug: "science",
    date: "2025-01-30",
    timeAgo: "1 week ago",
    image: placeholderImage,
    imageSmall: placeholderSmall,
    format: "standard",
  },
];

export function getFeaturedPosts(): Post[] {
  return mockPosts.filter((p) => p.featured).slice(0, 5);
}

/** First post = main featured, next 2 = sub stories (feat1 left column) */
export function getFeat1LeftPosts(): { main: Post; sub: [Post, Post] } {
  const featured = getFeaturedPosts();
  const main = featured[0];
  const sub: [Post, Post] = [featured[1], featured[2]];
  return { main, sub };
}

/** 5 posts for Trending column (exclude main featured 3) */
export function getTrendingPosts(): Post[] {
  const featured = getFeaturedPosts();
  const exclude = featured.slice(0, 3).map((p) => p.id);
  return mockPosts.filter((p) => !exclude.includes(p.id)).slice(0, 5);
}

/** Posts for Latest/Videos/Galleries list in feat1 right column (small thumb list) */
export function getFeat1ListPosts(excludeIds: string[] = []): Post[] {
  return mockPosts.filter((p) => !excludeIds.includes(p.id)).slice(0, 13);
}

/** All posts for More News section (home shows 10, load more 10 on click; no limit here) */
export function getMoreNewsPosts(excludeIds: string[] = []): Post[] {
  return mockPosts.filter((p) => !excludeIds.includes(p.id));
}

/** Posts by category for homepage widget sections */
export function getPostsByCategory(categorySlug: string, limit = 10): Post[] {
  return mockPosts.filter((p) => p.categorySlug === categorySlug).slice(0, limit);
}

/** All posts for a category section: 1 featured + 2 right + 3–6 side list (Feat2: Entertainment, Business) */
export function getCategorySectionPosts(categorySlug: string): {
  featured: Post | null;
  right: [Post, Post];
  list: Post[];
} {
  const posts = getPostsByCategory(categorySlug, 9);
  const featured = posts[0] ?? null;
  const right: [Post, Post] = [posts[1], posts[2]].filter(Boolean) as [Post, Post];
  const list = posts.slice(3, 9);
  if (right.length < 2) {
    const extra = mockPosts.filter((p) => p.categorySlug !== categorySlug).slice(0, 2 - right.length);
    right.push(...extra);
  }
  if (list.length < 3) {
    list.push(...mockPosts.filter((p) => !list.find((x) => x.id === p.id)).slice(0, 6 - list.length));
  }
  return { featured, right: right as [Post, Post], list };
}

/** Dark section: 1 featured + 4 list (Videos) */
export function getDarkSectionPosts(categorySlug: string): { featured: Post | null; list: Post[] } {
  const posts = getPostsByCategory(categorySlug, 5);
  const featured = posts[0] ?? null;
  let list = posts.slice(1, 5);
  if (list.length < 4) {
    list = list.concat(
      mockPosts.filter((p) => !list.find((x) => x.id === p.id) && p.id !== featured?.id).slice(0, 4 - list.length)
    );
  }
  return { featured, list };
}

/** Feat1 section: 2 top + 4 bottom (Tech) */
export function getFeat1SectionPosts(categorySlug: string): {
  top: [Post, Post];
  bottom: [Post, Post, Post, Post];
} {
  const posts = getPostsByCategory(categorySlug, 6);
  const top: [Post, Post] = [posts[0], posts[1]].filter(Boolean) as [Post, Post];
  let bottom = posts.slice(2, 6) as Post[];
  if (top.length < 2) {
    const extra = mockPosts.filter((p) => !top.find((x) => x.id === p.id)).slice(0, 2 - top.length);
    (top as Post[]).push(...extra);
  }
  if (bottom.length < 4) {
    bottom = bottom.concat(
      mockPosts.filter((p) => !bottom.find((x) => x.id === p.id) && !top.find((x) => x.id === p.id)).slice(0, 4 - bottom.length)
    ) as [Post, Post, Post, Post];
  }
  return { top: top as [Post, Post], bottom: bottom as [Post, Post, Post, Post] };
}

export function getPostBySlug(slug: string): Post | undefined {
  return mockPosts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return mockPosts;
}

/** Related posts for single post "You may like": same category first, then others to fill up to limit */
export function getRelatedPosts(excludeSlug: string, categorySlug: string, limit = 6): Post[] {
  const sameCategory = mockPosts.filter(
    (p) => p.slug !== excludeSlug && p.categorySlug === categorySlug
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const otherCategory = mockPosts.filter(
    (p) => p.slug !== excludeSlug && p.categorySlug !== categorySlug
  );
  return [...sameCategory, ...otherCategory].slice(0, limit);
}

/** Previous/next post by date order (by id for mock). Never returns current post. */
export function getPrevNextPosts(currentSlug: string): { prev: Post | null; next: Post | null } {
  const idx = mockPosts.findIndex((p) => p.slug === currentSlug);
  if (idx < 0) return { prev: null, next: null };
  const prevPost = idx > 0 ? mockPosts[idx - 1] ?? null : null;
  const nextPost = idx < mockPosts.length - 1 ? mockPosts[idx + 1] ?? null : null;
  return {
    prev: prevPost?.slug === currentSlug ? null : prevPost,
    next: nextPost?.slug === currentSlug ? null : nextPost,
  };
}

/** Posts with format video for Videos tab */
export function getVideoPosts(limit = 10): Post[] {
  return mockPosts.filter((p) => p.format === "video").slice(0, limit);
}

/** Default event card image (reference has image on top of each card) */
const DEFAULT_EVENT_IMAGE = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80";

/** Startup Events (from StartupNews.fyi reference) – location, date, title, url, excerpt, image for event-by-country page */
export interface StartupEvent {
  location: string;
  date: string;
  title: string;
  url: string;
  excerpt?: string;
  /** Card image URL; uses default if not set */
  image?: string;
}

export function getEventImage(event: StartupEvent): string {
  return event.image ?? DEFAULT_EVENT_IMAGE;
}

const EVENTS_BASE = "https://startupnews.thebackend.in/startup-events";

/** Order of regions for event-by-country page (matches reference layout) */
export const EVENTS_REGION_ORDER = [
  "Bengaluru",
  "Cohort",
  "Delhi NCR",
  "Dubai",
  "Hyderabad",
  "International Events",
  "Mumbai",
  "Other Cities",
] as const;

export const startupEvents: StartupEvent[] = [
  { location: "Bengaluru", date: "21 February 2026", title: "Healthcare Summit | Bangalore | 21 February 2026", url: `${EVENTS_BASE}/healthcare-summit-bangalore-21-february-2026/`, excerpt: "Calling Global Thought Leaders & Changemakers at Healthcare Summit 2026. Engage with curated sessions on…" },
  { location: "Bengaluru", date: "21 February 2026", title: "D2C Insider Regional CXO Meets | Bangalore | 21 February 2026", url: `${EVENTS_BASE}/d2c-insider-regional-cxo-meets-bangalore-21-february-2026/`, excerpt: "D2C Insider Regional CXO Meets Where D2C Leaders Connect & Collaborate! Join D2C Insider's most exclusive Regional…" },
  { location: "Bengaluru", date: "09 April 2026", title: "Connected, Autonomous & Electric Vehicle EXPO | Bangalore | 9-10 April 2026", url: `${EVENTS_BASE}/connected-autonomous-electric-vehicle-expo-bangalore-9-10-april-2026/`, excerpt: "Asia's biggest Connected, Autonomous & Electric Vehicle EXPO will be held on 09–10 April 2026 at the KTPO Convention…" },
  { location: "Cohort", date: "15 February 2026", title: "Onest Entrepreneurship Fellowship | Co-Hort | 1 December – 1 June", url: `${EVENTS_BASE}/onest-entrepreneurship-fellowship-co-hort-1-december-1-june/`, excerpt: "If you are building / wanting to build solutions for Employment, you can't miss this…" },
  { location: "Delhi NCR", date: "13 February 2026", title: "Community Networking Meetup : For Entrepreneurs By Entrepreneurs | Delhi | 13 February", url: `${EVENTS_BASE}/community-networking-meetup-for-entrepreneurs-by-entrepreneurs-delhi-13-february/`, excerpt: "Looking to connect with fellow entrepreneurs, share ideas, and build real relationships? This is an…" },
  { location: "Delhi NCR", date: "25 February 2026", title: "Municipalika | Delhi | 25-27 February", url: `${EVENTS_BASE}/municipalika-delhi-25-27-february/`, excerpt: "MUNICIPALIKA is India's oldest and largest trade show and conference on safe, smart and sustainable cities." },
  { location: "Delhi NCR", date: "14 March 2026", title: "India Smart Utility Week 2026 | Delhi | 10-14 March", url: `${EVENTS_BASE}/india-smart-utility-week-2026-delhi-10-14-march/`, excerpt: "The 12th edition of ISUW is scheduled from 10 - 14 March 2026 in New…" },
  { location: "Dubai", date: "12 February 2026", title: "The GATE Summit | Dubai | 12 February 2026", url: `${EVENTS_BASE}/the-gate-summit-dubai-12-february-2026/`, excerpt: "The GATE Summit Dubai 2026 (3rd Edition) will take place on 12 February 2026 in Dubai, UAE. Building on…" },
  { location: "Dubai", date: "28 April 2026", title: "The Experience Show Middle East 2026 | Dubai | 28-29 April", url: `${EVENTS_BASE}/the-experience-show-middle-east-2026-dubai-28-29-april/`, excerpt: "The Experience Show Middle East, encompassing the region's most prestigious CX Live Show, helps organisations…" },
  { location: "Dubai", date: "28 April 2026", title: "Operational Excellence Show Middle East 2026 | Dubai | 28-29 April", url: `${EVENTS_BASE}/operational-excellence-show-middle-east-2026-dubai-28-29-april/`, excerpt: "The Operational Excellence Show Middle East 2026 (CPD-accredited), taking place on 28-29 April in Dubai,…" },
  { location: "Dubai", date: "05 May 2026", title: "GISEC GLOBAL 2026 | Dubai | 5-7 May, 2026", url: `${EVENTS_BASE}/gisec-global-2026-dubai-5-7-may-2026/`, excerpt: "The largest cybersecurity event in the Middle East and Africa, in collaboration with the UAE Cybersecurity Council and Dubai…" },
  { location: "Hyderabad", date: "23 April 2026", title: "India Pharma Expo 2026 | Hyderabad | 23-25 April, 2026", url: `${EVENTS_BASE}/india-pharma-expo-2026-hyderabad-23-25-april-2026/`, excerpt: "India Pharma Expo 2026 is a premier international exhibition and conference dedicated to the pharmaceutical,…" },
  { location: "International Events", date: "15 February 2026", title: "World Advanced Manufacturing Saudi | Riyadh | 15-17 February, 2026", url: `${EVENTS_BASE}/world-advanced-manufacturing-saudi-riyadh-15-17-february-2026/`, excerpt: "WAM Saudi 2026 is organised by KAOUN International (a subsidiary of Dubai World Trade Centre)…" },
  { location: "International Events", date: "26 February 2026", title: "3rd Fintech Week & Expo 2026 | Amsterdam | 26-27 February", url: `${EVENTS_BASE}/3rd-fintech-week-expo-2026-amsterdam-26-27-february/`, excerpt: "3rd Fintech Week & Expo Amsterdam 2026 unites a vibrant international community of fintech innovators,…" },
  { location: "International Events", date: "25 March 2026", title: "ASEAN Smart Energy & Energy Storage Expo 2026 | Thailand | March 25-26", url: `${EVENTS_BASE}/asean-smart-energy-energy-storage-expo-2026-thailand-march-25-26/`, excerpt: "Guided by the Ministry of Energy of Thailand & Electricity Generating Authority of Thailand (EGAT)…" },
  { location: "International Events", date: "25 March 2026", title: "ASEAN Solar PV & Energy Storage Expo 2026 | Thailand | March 25-27", url: `${EVENTS_BASE}/asean-solar-pv-energy-storage-expo-2026-thailand-march-25-27/`, excerpt: "ASEAN Solar PV & Energy Storage Expo 2026 will be held in Bangkok Thailand on…" },
  { location: "International Events", date: "07 April 2026", title: "Education 2.0 Conference | USA | 7-9 April, 2026", url: `${EVENTS_BASE}/education-2-0-conference-usa-7-9-april-2026/`, excerpt: "The Education 2.0 Conference will be held over three days at the InterContinental, Dubai Festival…" },
  { location: "International Events", date: "07 April 2026", title: "CXO 2.0 Conference | USA | 7-9 April, 2026", url: `${EVENTS_BASE}/cxo-2-0-conference-usa-7-9-april-2026/`, excerpt: "The CXO 2.0 Conference will bring together senior leaders, decision-makers, and emerging voices from across…" },
  { location: "International Events", date: "07 April 2026", title: "Founders 2.0 Conference | USA | 7-9 April, 2026", url: `${EVENTS_BASE}/founders-2-0-conference-usa-7-9-april-2026/`, excerpt: "The Founders 2.0 Conference gathers entrepreneurs, startup leaders, and innovators for two dynamic editions…" },
  { location: "International Events", date: "07 April 2026", title: "FUELD Conference | USA | 7-9 April, 2026", url: `${EVENTS_BASE}/fueld-conference-usa-7-9-april-2026/`, excerpt: "The FUELD Conference is a global gathering of leaders, strategists, and innovators operating at the…" },
  { location: "International Events", date: "07 April 2026", title: "Health 2.0 Conference | USA | 7-9 April, 2026", url: `${EVENTS_BASE}/health-2-0-conference-usa-7-9-april-2026/`, excerpt: "The Health 2.0 Conference is set to convene global healthcare professionals and innovators for two…" },
  { location: "International Events", date: "09 April 2026", title: "CFO StraTech 2026 | Turkey | 9 April", url: `${EVENTS_BASE}/cfo-stratech-2026-turkey-9-april/`, excerpt: "Located at the crossroads of Europe, Asia, and the Middle East, Türkiye is entering a…" },
  { location: "International Events", date: "16 April 2026", title: "BFSI Philippines Summit | Philippines | 16 April 2026", url: `${EVENTS_BASE}/bfsi-philippines-summit-philippines-16-april-2026/`, excerpt: "As the proud organizers of the successful Digital Banking Asia Series for over a decade,…" },
  { location: "International Events", date: "21 April 2026", title: "Money20/20 Asia 2026 | Thailand | 21-23 April", url: `${EVENTS_BASE}/money-20-20-asia-2026-thailand-21-23-april/`, excerpt: "After two successful editions, Money20/20 Asia will return to Bangkok's state-of-the-art Queen Sirikit National Convention…" },
  { location: "International Events", date: "30 April 2026", title: "Asia Retail Innovation | Philippines | 30 April 2026", url: `${EVENTS_BASE}/asia-retail-innovation-philippines-30-april-2026/`, excerpt: "Since 2015, the Asia Retail & eCommerce Innovation Summit has been the premier platform for…" },
  { location: "International Events", date: "21 May 2026", title: "GLOBAL BIOPROCESSING & BIOTECHNOLOGY SUMMIT | Berlin | 21-22 May", url: `${EVENTS_BASE}/global-bioprocessing-biotechnology-summit-berlin-21-22-may/`, excerpt: "The Global Bioprocessing Summit will unite leading industry experts, researchers, and innovators to explore the…" },
  { location: "International Events", date: "02 June 2026", title: "Future Biotech Expo | USA | 2-3 June, 2026", url: `${EVENTS_BASE}/future-biotech-expo-usa-2-3-june-2026/`, excerpt: "The Future Biotech Expo is a premier international red biotechnology exhibition and conference dedicated to accelerating breakthroughs…" },
  { location: "International Events", date: "10 June 2026", title: "The Experience Show Asia | Singapore | 10-11 June", url: `${EVENTS_BASE}/the-experience-show-asia-singapore-10-11-june/`, excerpt: "The Experience Show Asia, encompassing the region's most prestigious CX Live Show, helps organisations develop…" },
  { location: "International Events", date: "16 June 2026", title: "4th Data Science & AI Summit | London | 16-17 June", url: `${EVENTS_BASE}/4th-data-science-ai-summit-london-16-17-june/`, excerpt: "Data Science Week is an international platform designed to bring together the brightest minds across…" },
  { location: "International Events", date: "18 June 2026", title: "London Biotechnology Show | London | 18-19 June, 2026", url: `${EVENTS_BASE}/london-biotechnology-show-london-18-19-june-2026/`, excerpt: "The London Biotechnology Show is a leading biotechnology industry event aimed at accelerating innovation and…" },
  { location: "International Events", date: "18 June 2026", title: "The Experience Show South Europe 2026 | Madrid | 18-19 June", url: `${EVENTS_BASE}/the-experience-show-south-europe-2026-madrid-18-19-june/`, excerpt: "The Experience Show South Europe, encompassing the region's most prestigious CX Live Show, helps organisations…" },
  { location: "International Events", date: "01 July 2026", title: "Smart Health Asia 2026 | Singapore | 1-2 July", url: `${EVENTS_BASE}/smart-health-asia-2026-singapore-1-2-july/`, excerpt: "Smart Health Asia is a platform dedicated to transforming healthcare across the region." },
  { location: "International Events", date: "07 July 2026", title: "The Experience Show UK 2026 | Manchester | 7-8 July", url: `${EVENTS_BASE}/the-experience-show-uk-2026-manchester-7-8-july/`, excerpt: "The Experience Show UK, encompassing the region's most prestigious CX Live Show, helps organisations develop…" },
  { location: "International Events", date: "28 July 2026", title: "The Experience Show Asia 2026 | Malaysia | 28-29 July", url: `${EVENTS_BASE}/the-experience-show-asia-2026-malaysia-28-29-july/`, excerpt: "The Experience Show Asia, encompassing the region's most prestigious CX Live Show, helps organisations develop…" },
  { location: "International Events", date: "04 August 2026", title: "The Experience Show 2026 | Australia | 4-5 August", url: `${EVENTS_BASE}/the-experience-show-2026-australia-4-5-august/`, excerpt: "The Experience Show Australia, encompassing the region's most prestigious CX Live Show, helps organisations develop…" },
  { location: "International Events", date: "10 September 2026", title: "ASEAN SHOP 2026 | Malaysia | 10 – 12 September", url: `${EVENTS_BASE}/asean-shop-2026-malaysia-10-12-september/`, excerpt: "ASEAN SHOP 2026 will take place from 10–12 September 2026 at MITEC, Kuala Lumpur, following…" },
  { location: "International Events", date: "16 September 2026", title: "11th World Battery & Energy Storage Industry Expo 2026 | China | September 16", url: `${EVENTS_BASE}/11th-world-battery-energy-storage-industry-expo-2026-china-september-16/`, excerpt: "WBE 2026 is set to take place from September 16th-18th at the China Import and…" },
  { location: "Mumbai", date: "12 February 2026", title: "IFEX 2026 – 22nd International Exhibition | Mumbai | 12-14 February", url: `${EVENTS_BASE}/ifex-2026-22nd-international-exhibition-mumbai-12-14-february/`, excerpt: "IFEX 2026 – 22nd International Exhibition on Foundry Technology Equipment Supplies and Services concurrent with…" },
  { location: "Mumbai", date: "05 October 2026", title: "Mumbai 2026 Venture Capital World Summit | Mumbai | 5 October", url: `${EVENTS_BASE}/mumbai-2026-venture-capital-world-summit-mumbai-5-october/`, excerpt: "Mumbai India Venture Capital World Summit, World Series Season of Investment Conferences Venture Capital World…" },
  { location: "Other Cities", date: "13 February 2026", title: "Community Networking Meetup: For Entrepreneurs By Entrepreneurs | Pune | 13 February", url: `${EVENTS_BASE}/community-networking-meetup-for-entrepreneurs-by-entrepreneurs-pune-13-february/`, excerpt: "Looking to connect with fellow entrepreneurs, share ideas, and build real relationships? This is an…" },
  { location: "Other Cities", date: "21 February 2026", title: "Le Startups Confluence | Gurugram | 21 February 2026", url: `${EVENTS_BASE}/le-startups-confluence-gurugram-21-february-2026/`, excerpt: "NASSCOM Innovation Hub, Gurugram. Join India's most impactful startup meetup crafted for founders investors and…" },
  { location: "Other Cities", date: "20 March 2026", title: "TECHSTARS STARTUP WEEKEND | SILIGURI | 20 – 22 March 2026", url: `${EVENTS_BASE}/techstars-startup-weekend-siliguri-20-22-march-2026/`, excerpt: "Startup Weekend is a three-day event organized by the Incubation cell at Inspiria Knowledge Campus,…" },
  { location: "Other Cities", date: "27 March 2026", title: "EV Future Summit India 2026 | Chennai | March 27", url: `${EVENTS_BASE}/ev-future-summit-india-2026-chennai-march-27/`, excerpt: "The EV Future Summit is a platform that brings together experts, industry leaders, and innovators…" },
  { location: "Other Cities", date: "19 November 2026", title: "Women in Tech Chennai – OutGeekWomen 2026 | Chennai | November 19", url: `${EVENTS_BASE}/women-in-tech-chennai-outgeekwomen-2026-chennai-november-19/`, excerpt: "All the badass women in tech, are you in? #outgeekwomen #womenintech We are happy to…" },
];

/** Events grouped by region for event-by-country page. Returns regions in EVENTS_REGION_ORDER with non-empty events. */
export function getEventsByRegion(): Record<string, StartupEvent[]> {
  const map: Record<string, StartupEvent[]> = {};
  for (const region of EVENTS_REGION_ORDER) {
    map[region] = startupEvents.filter((e) => e.location === region);
  }
  return map;
}
