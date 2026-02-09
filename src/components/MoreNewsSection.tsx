"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/data";

const PAGE_SIZE = 10;

interface MoreNewsSectionProps {
  posts: Post[];
  buttonText?: string;
  pageSize?: number;
}

export function MoreNewsSection({
  posts,
  buttonText = "More Posts",
  pageSize = 10,
}: MoreNewsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;
  const loadMore = () => setVisibleCount((c) => Math.min(c + pageSize, posts.length));

  return (
    <>
      <ul className="mvp-blog-story-list left relative infinite-content">
        {visiblePosts.map((post) => (
          <li key={post.id} className="mvp-blog-story-wrap left relative infinite-post">
            <Link href={`/post/${post.slug}`} rel="bookmark">
              <div className="mvp-blog-story-out relative">
                <div className="mvp-blog-story-img left relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="mvp-big-img"
                    width={1000}
                    height={600}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                  <Image
                    src={post.imageSmall || post.image}
                    alt={post.title}
                    className="mvp-reg-img"
                    width={400}
                    height={240}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                  <Image
                    src={post.imageSmall || post.image}
                    alt={post.title}
                    className="mvp-mob-img"
                    width={330}
                    height={200}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                </div>
                <div className="mvp-blog-story-in">
                  <div className="mvp-blog-story-text left relative">
                    <div className="mvp-cat-date-wrap left relative">
                      <span className="mvp-cd-cat left relative">{post.category}</span>
                      <span className="mvp-cd-date left relative">{post.timeAgo}</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mvp-inf-more-wrap left relative">
        {hasMore ? (
          <button
            type="button"
            className="mvp-inf-more-but"
            onClick={loadMore}
            aria-label="Load more news"
          >
            {buttonText}
          </button>
        ) : posts.length > PAGE_SIZE ? (
          <span className="mvp-inf-more-but" aria-hidden="true">
            No more posts
          </span>
        ) : null}
      </div>
    </>
  );
}
