import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function FlyMenu() {
  return (
    <div id="mvp-fly-wrap">
      <div id="mvp-fly-menu-top" className="left relative">
        <div className="mvp-fly-top-out left relative">
          <div className="mvp-fly-top-in">
            <div id="mvp-fly-logo" className="left relative">
              <Link href="/">
                <Image
                  src={siteConfig.logoNav}
                  alt={siteConfig.name}
                  width={200}
                  height={30}
                  data-rjs="2"
                />
              </Link>
            </div>
          </div>
          <div className="mvp-fly-but-wrap mvp-fly-but-menu mvp-fly-but-click">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div id="mvp-fly-menu-wrap">
        <nav className="mvp-fly-nav-menu left relative">
          <ul>
            {siteConfig.menu.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div id="mvp-fly-soc-wrap">
        <span className="mvp-fly-soc-head">Connect with us</span>
        <ul className="mvp-fly-soc-list left relative">
          {siteConfig.social.facebook && (
            <li>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="fab fa-facebook-f"></a>
            </li>
          )}
          {siteConfig.social.twitter && (
            <li>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="fa-brands fa-x-twitter"></a>
            </li>
          )}
          {siteConfig.social.pinterest && (
            <li>
              <a href={siteConfig.social.pinterest} target="_blank" rel="noopener noreferrer" className="fab fa-pinterest-p"></a>
            </li>
          )}
          {siteConfig.social.instagram && (
            <li>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="fab fa-instagram"></a>
            </li>
          )}
          {siteConfig.social.tiktok && (
            <li>
              <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="fab fa-tiktok"></a>
            </li>
          )}
          {siteConfig.social.youtube && (
            <li>
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="fab fa-youtube"></a>
            </li>
          )}
          {siteConfig.social.linkedin && (
            <li>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="fab fa-linkedin"></a>
            </li>
          )}
          {siteConfig.social.tumblr && (
            <li>
              <a href={siteConfig.social.tumblr} target="_blank" rel="noopener noreferrer" className="fab fa-tumblr"></a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
