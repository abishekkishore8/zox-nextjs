"use client";

import { useState } from "react";
import type { Post } from "@/lib/data";
import { FullArticle } from "@/components/FullArticle";

interface InfiniteArticleLoaderProps {
    initialPosts: Post[];
    availablePosts: Post[];
}

export function InfiniteArticleLoader({ initialPosts, availablePosts }: InfiniteArticleLoaderProps) {
    const [appendedPosts, setAppendedPosts] = useState<Post[]>([]);
    const currentIndex = appendedPosts.length;
    const hasMore = currentIndex < availablePosts.length;

    const loadMore = () => {
        if (hasMore) {
            setAppendedPosts((prev) => [...prev, availablePosts[currentIndex]]);
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
                        style={{ cursor: "pointer", float: "none" }}
                    >
                        More News
                    </button>
                </div>
            )}
        </div>
    );
}
