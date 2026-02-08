import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/data";
import { Sidebar } from "@/components/Sidebar";

export default function NewsPage() {
  const posts = getAllPosts();

  return (
    <div className="mvp-main-blog-wrap left relative mvp-main-blog-marg">
      <div className="mvp-main-box">
        <div className="mvp-main-blog-cont left relative">
          <div className="mvp-main-blog-out left relative">
            <div className="mvp-main-blog-in">
              <div className="mvp-main-blog-body left relative">
                <ul className="mvp-blog-story-list left relative infinite-content">
                  {posts.map((post) => (
                    <li key={post.id} className="mvp-blog-story-wrap left relative infinite-post">
                      <Link href={`/post/${post.slug}`} rel="bookmark">
                        <div className="mvp-blog-story-out relative">
                          <div className="mvp-blog-story-img left relative">
                            <Image
                              src={post.image}
                              alt={post.title}
                              className="mvp-reg-img mvp-big-img"
                              width={800}
                              height={500}
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
                  <Link href="/news" className="mvp-inf-more-but">
                    More Posts
                  </Link>
                  <div className="mvp-nav-links">
                    <Link href="/news">Page 1 of 1</Link>
                  </div>
                </div>
              </div>
            </div>
            <div id="mvp-side-wrap" className="left relative theiaStickySidebar">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
