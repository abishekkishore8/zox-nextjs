import { getTrendingPosts, getFeat1ListPosts, getVideoPosts } from "@/lib/data";
import { SidebarTabber } from "@/components/SidebarTabber";

interface SidebarProps {
  excludeIds?: string[];
}

/** Theme sidebar: Tabber (Latest, Trending, Videos) + optional ad. Used on single post, news, category, search. */
export function Sidebar({ excludeIds = [] }: SidebarProps) {
  const latest = getFeat1ListPosts(excludeIds).slice(0, 10);
  const trending = getTrendingPosts();
  const videos = getVideoPosts(10).length > 0 ? getVideoPosts(10) : getFeat1ListPosts(excludeIds).slice(0, 6);

  return (
    <>
      <section className="mvp-side-widget">
        <SidebarTabber latest={latest} trending={trending} videos={videos} />
      </section>
      <section className="mvp-side-widget">
        <div className="mvp-widget-home-head">
          <h4 className="mvp-widget-home-title2">
            <span className="mvp-widget-home-title2">Advertisement</span>
          </h4>
        </div>
        <div style={{ background: "#f0f0f0", padding: 20, textAlign: "center", minHeight: 250 }}>
          Ad
        </div>
      </section>
    </>
  );
}
