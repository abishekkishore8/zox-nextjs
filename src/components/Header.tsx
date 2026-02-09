"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { FlyMenuButton } from "@/components/FlyMenuButton";

export function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  // Handle search icon click - toggle expansion on mobile
  const handleSearchClick = (e: React.MouseEvent) => {
    // Only handle expansion on mobile, desktop uses overlay
    if (window.innerWidth <= 767) {
      // If search is already expanded, let form submit handle it
      if (isSearchExpanded) {
        // Form will handle submission
        return;
      }
      // Otherwise, expand the search
      e.preventDefault();
      e.stopPropagation();
      setIsSearchExpanded(true);
    }
    // On desktop, let the default behavior (overlay) happen
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = searchInputRef.current;
    if (input && input.value.trim()) {
      // Navigate to search page
      window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
    }
  };

  // Focus input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Close search when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isSearchExpanded &&
        searchWrapRef.current &&
        !searchWrapRef.current.contains(e.target as Node) &&
        window.innerWidth <= 767
      ) {
        setIsSearchExpanded(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchExpanded && window.innerWidth <= 767) {
        setIsSearchExpanded(false);
      }
    };

    if (isSearchExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isSearchExpanded]);

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
                <div className="mvp-nav-bot-right left relative startupnews-search-wrap" ref={searchWrapRef}>
                  <form
                    className={`startupnews-search ${isSearchExpanded ? "startupnews-search-expanded" : ""}`}
                    onSubmit={handleSearchSubmit}
                  >
                    <input
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search..."
                      className="startupnews-search-input"
                      aria-label="Search"
                    />
                    <button
                      type="submit"
                      className="startupnews-search-btn mvp-search-click"
                      aria-label="Search"
                      onClick={handleSearchClick}
                    >
                      <i className="fa fa-search" aria-hidden></i>
                    </button>
                  </form>
                  {/* Hamburger menu for mobile - right side */}
                  <div className="mvp-nav-bot-right-mobile-hamburger">
                    <FlyMenuButton />
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
