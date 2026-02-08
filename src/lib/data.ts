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
