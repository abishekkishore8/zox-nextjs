import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getAllPosts,
  getRelatedPosts,
  getPrevNextPosts,
} from "@/lib/data-adapter";
import { FullArticle } from "@/components/FullArticle";
import { InfiniteArticleLoader } from "@/components/InfiniteArticleLoader";

// Limit static generation to top 100 most recent posts for better build performance
// Remaining posts will be generated on-demand (ISR)
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    // Only pre-generate top 100 most recent posts
    // This balances build time with initial page load performance
    const topPosts = posts.slice(0, 100);
    return topPosts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error('Error generating static params for posts:', error);
    // Return empty array if database is not available during build
    return [];
  }
}

// Enable ISR - pages not in generateStaticParams will be generated on-demand
// and cached for 1 hour
export const revalidate = 3600; // 1 hour

// Allow dynamic params for posts not in generateStaticParams
export const dynamicParams = true;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, post.categorySlug, 6);
  const { prev, next } = await getPrevNextPosts(slug);

  // Get all posts for "More News" functionality, excluding current
  const availablePosts = (await getAllPosts()).filter((p) => p.slug !== slug);

  return (
    <div id="mvp-post-main-container">
      {/* Main post */}
      <FullArticle post={post} related={related} prev={prev} next={next} />

      {/* Loader for more full articles */}
      <InfiniteArticleLoader initialPosts={[post]} availablePosts={availablePosts} />
    </div>
  );
}
