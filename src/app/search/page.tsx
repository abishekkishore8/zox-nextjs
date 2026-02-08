import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/data";
import { Sidebar } from "@/components/Sidebar";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const allPosts = getAllPosts();
  const posts = q
    ? allPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  return (
    <div className="mvp-main-blog-wrap left relative">
      <div className="mvp-main-box">
        <div className="mvp-main-blog-cont left relative">
          <header id="mvp-post-head" className="left relative">
            <h1 className="mvp-post-title left entry-title" itemProp="headline">
              {q ? (
                <>
                  Search results for &quot;{q}&quot;
                </>
              ) : (
                "Search"
              )}
            </h1>
          </header>
          <div className="mvp-main-blog-out left relative">
            <div className="mvp-main-blog-in">
              <div className="mvp-main-blog-body left relative">
                {!q ? (
                  <div className="mvp-search-text left relative">
                    <p>Enter a search term above.</p>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="mvp-search-text left relative">
                    <p>Sorry, your search did not match any entries.</p>
                  </div>
                ) : (
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
                )}
                <div className="mvp-inf-more-wrap left relative">
                  <div className="mvp-nav-links">
                    {posts.length > 0 && <Link href="/news">Page 1 of 1</Link>}
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
