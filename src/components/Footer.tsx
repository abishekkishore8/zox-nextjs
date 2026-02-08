import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

const footerSocialClasses: Record<string, string> = {
  facebook: "fab fa-facebook-f",
  twitter: "fa-brands fa-x-twitter",
  pinterest: "fab fa-pinterest-p",
  instagram: "fab fa-instagram",
  tiktok: "fab fa-tiktok",
  youtube: "fab fa-youtube",
  linkedin: "fab fa-linkedin",
  tumblr: "fab fa-tumblr",
};

export function Footer() {
  const socialEntries = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer id="mvp-foot-wrap" className="left relative">
      <div id="mvp-foot-top" className="left relative">
        <div className="mvp-main-box">
          <div id="mvp-foot-logo" className="left relative">
            <Link href="/">
              <Image src={siteConfig.logoFoot} alt={siteConfig.name} width={300} height={60} data-rjs="2" />
            </Link>
          </div>
          <div id="mvp-foot-soc" className="left relative">
            <ul className="mvp-foot-soc-list left relative">
              {socialEntries.map(([key, url]) => {
                const iconClass = footerSocialClasses[key];
                if (!iconClass) return null;
                return (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={iconClass}></a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div id="mvp-foot-menu-wrap" className="left relative">
            <div id="mvp-foot-menu" className="left relative">
              <ul>
                {siteConfig.footerMenu.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="mvp-foot-bot" className="left relative">
        <div className="mvp-main-box">
          <div id="mvp-foot-copy" className="left relative">
            <p dangerouslySetInnerHTML={{ __html: siteConfig.copyright }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
