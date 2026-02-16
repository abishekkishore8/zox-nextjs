"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Banner } from "@/modules/banners/domain/types";

interface BannerCarouselProps {
  banners: Banner[];
}

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Filter active banners
  const activeBanners = banners.filter((banner) => banner.isActive);

  // Auto-play carousel
  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000); // Change slide every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeBanners.length, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  if (activeBanners.length === 0) {
    return null;
  }

  const currentBanner = activeBanners[currentIndex];

  return (
    <div className="banner-carousel-container">
      <div className="banner-carousel-wrapper">
        {activeBanners.length > 1 && (
          <>
            <button
              type="button"
              className="banner-carousel-btn banner-carousel-btn-prev"
              onClick={goToPrev}
              aria-label="Previous banner"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              type="button"
              className="banner-carousel-btn banner-carousel-btn-next"
              onClick={goToNext}
              aria-label="Next banner"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}

        <div className="banner-carousel-slide">
          {currentBanner.linkUrl ? (
            <Link href={currentBanner.linkUrl} className="banner-carousel-link">
              <Image
                src={currentBanner.imageUrl}
                alt={currentBanner.title}
                fill
                className="banner-carousel-image"
                priority={currentIndex === 0}
                sizes="100vw"
                unoptimized
              />
              <div className="banner-carousel-overlay">
                <div className="banner-carousel-content">
                  <h2 className="banner-carousel-title">{currentBanner.title}</h2>
                  {currentBanner.description && (
                    <p className="banner-carousel-description">{currentBanner.description}</p>
                  )}
                  {currentBanner.linkText && (
                    <span className="banner-carousel-link-text">{currentBanner.linkText} →</span>
                  )}
                </div>
              </div>
            </Link>
          ) : (
            <div className="banner-carousel-slide-inner">
              <Image
                src={currentBanner.imageUrl}
                alt={currentBanner.title}
                fill
                className="banner-carousel-image"
                priority={currentIndex === 0}
                sizes="100vw"
                unoptimized
              />
              <div className="banner-carousel-overlay">
                <div className="banner-carousel-content">
                  <h2 className="banner-carousel-title">{currentBanner.title}</h2>
                  {currentBanner.description && (
                    <p className="banner-carousel-description">{currentBanner.description}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {activeBanners.length > 1 && (
          <div className="banner-carousel-dots">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`banner-carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

