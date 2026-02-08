import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { FlyMenuButton } from "@/components/FlyMenuButton";

export function Header() {
  return (
    <header id="mvp-main-head-wrap" className="left relative startupnews-nav">
      <nav id="mvp-main-nav-wrap" className="left relative">
        <div id="mvp-main-nav-bot" className="left relative">
          <div id="mvp-main-nav-bot-cont" className="left">
            <div className="mvp-main-box">
              <div id="mvp-nav-bot-wrap" className="left relative startupnews-nav-inner">
                <div className="mvp-nav-bot-right-out left">
                  <div className="mvp-nav-bot-right-in">
                    <div className="mvp-nav-bot-cont left">
                      <div className="mvp-nav-bot-left-out">
                        <div className="mvp-nav-bot-left left relative">
                          <FlyMenuButton />
                        </div>
                        <div className="mvp-nav-bot-left-in startupnews-nav-left">
                          <Link href="/" className="startupnews-logo-link">
                            <Image
                              src={siteConfig.logo}
                              alt={siteConfig.name}
                              width={220}
                              height={46}
                              className="startupnews-logo"
                              priority
                            />
                          </Link>
                          <div className="mvp-nav-menu left startupnews-menu">
                            <ul>
                              {siteConfig.menu.map((item) => (
                                <li key={item.href}>
                                  <Link href={item.href}>
                                    {item.label}
                                    {"hasDropdown" in item && item.hasDropdown && (
                                      <span className="startupnews-dropdown-arrow">▼</span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mvp-nav-bot-right left relative startupnews-search-wrap">
                  <div className="startupnews-search">
                    <input
                      type="search"
                      placeholder="Search..."
                      className="startupnews-search-input"
                      aria-label="Search"
                    />
                    <button type="button" className="startupnews-search-btn mvp-search-click" aria-label="Search">
                      <i className="fa fa-search" aria-hidden></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
