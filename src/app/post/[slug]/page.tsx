import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPostBySlug,
  getMoreNewsPosts,
  getMoreNewsSlugs,
  getRelatedPosts,
  getPrevNextPosts,
} from "@/lib/data-adapter";
import { FullArticle } from "@/components/FullArticle";
import { InfiniteArticleLoader } from "@/components/InfiniteArticleLoader";

// ISR: cache page for 60s so repeat views are instant
export const revalidate = 60;

const SITE_BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://startupnews.thebackend.in";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  const title = post.title || "StartupNews.fyi";
  const description = (post.excerpt || "").slice(0, 160);
  const image = post.image && !post.image.includes("unsplash.com/photo-1504711434969") ? post.image : undefined;
  const postUrl = `${SITE_BASE}/post/${slug}`;
  return {
    title,
    description: description || undefined,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: "article",
      title,
      description: description || undefined,
      url: postUrl,
      siteName: "StartupNews.fyi",
      publishedTime: post.publishedAt || post.date,
      section: post.category,
      tags: post.tags,
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || undefined,
      ...(image && { images: [image] }),
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Parallel fetch related, prev/next, and more-news slugs
  const [related, { prev, next }, availableSlugs] = await Promise.all([
    getRelatedPosts(slug, post.categorySlug, 6),
    getPrevNextPosts(slug),
    getMoreNewsSlugs([post.id]),
  ]);

  // JSON-LD: NewsArticle schema
  const image = post.image && !post.image.includes("unsplash.com/photo-1504711434969") ? post.image : undefined;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: (post.excerpt || "").slice(0, 200),
    ...(image && { image: [image] }),
    datePublished: post.publishedAt || post.date,
    dateModified: post.publishedAt || post.date,
    author: {
      "@type": post.sourceName ? "Organization" : "Organization",
      name: post.sourceAuthor || post.sourceName || "StartupNews.fyi",
    },
    publisher: {
      "@type": "Organization",
      name: "StartupNews.fyi",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_BASE}/images/logos/startupnews-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_BASE}/post/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_BASE },
      { "@type": "ListItem", position: 2, name: post.category, item: `${SITE_BASE}/category/${post.categorySlug}` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <div id="mvp-post-main-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Main post */}
      <FullArticle post={post} related={related} prev={prev} next={next} />

      {/* Loader for more full articles */}
      <InfiniteArticleLoader initialPosts={[post]} availableSlugs={availableSlugs} />
    </div>
  );
}
