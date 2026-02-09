import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getAllPosts,
  getRelatedPosts,
  getPrevNextPosts,
} from "@/lib/data";
import { FullArticle } from "@/components/FullArticle";
import { InfiniteArticleLoader } from "@/components/InfiniteArticleLoader";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, post.categorySlug, 6);
  const { prev, next } = getPrevNextPosts(slug);

  // Get all posts for "More News" functionality, excluding current
  const availablePosts = getAllPosts().filter((p) => p.slug !== slug);

  return (
    <div id="mvp-post-main-container">
      {/* Main post */}
      <FullArticle post={post} related={related} prev={prev} next={next} />

      {/* Loader for more full articles */}
      <InfiniteArticleLoader initialPosts={[post]} availablePosts={availablePosts} />
    </div>
  );
}
