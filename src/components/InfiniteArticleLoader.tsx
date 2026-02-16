"use client";

import { useState } from "react";
import type { Post } from "@/lib/data-adapter";
import { FullArticle } from "@/components/FullArticle";

interface InfiniteArticleLoaderProps {
    initialPosts: Post[];
    availableSlugs: string[]; // Changed from availablePosts: Post[]
}

export function InfiniteArticleLoader({ initialPosts, availableSlugs }: InfiniteArticleLoaderProps) {
    const [appendedPosts, setAppendedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);

    // We have loaded X posts so far. The next one to load is at index X.
    const currentIndex = appendedPosts.length;
    const hasMore = currentIndex < availableSlugs.length;

    const loadMore = async () => {
        if (!hasMore || loading) return;

        setLoading(true);
        const nextSlug = availableSlugs[currentIndex];

        try {
            const res = await fetch(`/api/posts/${nextSlug}`);
            if (!res.ok) throw new Error('Failed to load post');

            const data = await res.json();
            if (data.success && data.data) {
                setAppendedPosts((prev) => [...prev, data.data]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="infinite-article-loader">
            {/* The main post is rendered by the parent, but we handle the appended ones here */}
            {appendedPosts.map((post) => (
                <FullArticle key={post.id} post={post} />
            ))}

            {hasMore && (
                <div className="mvp-inf-more-wrap left relative" style={{ margin: "40px auto", textAlign: "center", float: "none", display: "flex", justifyContent: "center" }}>
                    <button
                        type="button"
                        className="mvp-more-news-but mvp-inf-more-but"
                        onClick={loadMore}
                        disabled={loading}
                        style={{ cursor: "pointer", float: "none", opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Loading...' : 'More News'}
                    </button>
                </div>
            )}
        </div>
    );
}
