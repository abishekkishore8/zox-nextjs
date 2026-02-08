import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function Header() {
  return (
    <header id="mvp-main-head-wrap" className="left relative">
      <nav id="mvp-main-nav-wrap" className="left relative">
        {/* Top bar - logo + social + search */}
        <div id="mvp-main-nav-top" className="left relative">
          <div className="mvp-main-box">
            <div id="mvp-nav-top-wrap" className="left relative">
              <div className="mvp-nav-top-right-out left relative">
                <div className="mvp-nav-top-right-in">
                  <div className="mvp-nav-top-cont left relative">
                    <div className="mvp-nav-top-left-out relative">
                      <div className="mvp-nav-top-left">
                        <div className="mvp-nav-soc-wrap">
                          {siteConfig.social.facebook && (
                            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer">
                              <span className="mvp-nav-soc-but fab fa-facebook-f"></span>
                            </a>
                          )}
                          {siteConfig.social.twitter && (
                            <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">
                              <span className="mvp-nav-soc-but fa-brands fa-x-twitter"></span>
                            </a>
                          )}
                          {siteConfig.social.instagram && (
                            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
                              <span className="mvp-nav-soc-but fab fa-instagram"></span>
                            </a>
                          )}
                          {siteConfig.social.youtube && (
                            <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer">
                              <span className="mvp-nav-soc-but fab fa-youtube"></span>
                            </a>
                          )}
                        </div>
                        <div className="mvp-fly-but-wrap mvp-fly-but-click left relative">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                      <div className="mvp-nav-top-left-in">
                        <div className="mvp-nav-top-mid left relative" itemScope itemType="http://schema.org/Organization">
                          <Link className="mvp-nav-logo-reg" href="/" itemProp="url">
                            <Image
                              src={siteConfig.logo}
                              alt={siteConfig.name}
                              width={300}
                              height={60}
                              itemProp="logo"
                              data-rjs="2"
                            />
                          </Link>
                          <Link className="mvp-nav-logo-small" href="/">
                            <Image src={siteConfig.logoNav} alt={siteConfig.name} width={200} height={30} data-rjs="2" />
                          </Link>
                          <h1 className="mvp-logo-title">{siteConfig.name}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mvp-nav-top-right">
                  <span className="mvp-nav-search-but fa fa-search fa-2 mvp-search-click"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom bar - menu + search */}
        <div id="mvp-main-nav-bot" className="left relative">
          <div id="mvp-main-nav-bot-cont" className="left">
            <div className="mvp-main-box">
              <div id="mvp-nav-bot-wrap" className="left">
                <div className="mvp-nav-bot-right-out left">
                  <div className="mvp-nav-bot-right-in">
                    <div className="mvp-nav-bot-cont left">
                      <div className="mvp-nav-bot-left-out">
                        <div className="mvp-nav-bot-left left relative">
                          <div className="mvp-fly-but-wrap mvp-fly-but-click left relative">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                        <div className="mvp-nav-bot-left-in">
                          <div className="mvp-nav-menu left">
                            <ul>
                              {siteConfig.menu.map((item) => (
                                <li key={item.href}>
                                  <Link href={item.href}>{item.label}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mvp-nav-bot-right left relative">
                    <span className="mvp-nav-search-but fa fa-search fa-2 mvp-search-click"></span>
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
