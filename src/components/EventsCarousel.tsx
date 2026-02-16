"use client";

import { useState, useRef, useEffect } from "react";
import type { StartupEvent } from "@/lib/data-adapter";
import { EventByCountryCard } from "@/components/EventByCountryCard";
import { getEventImage } from "@/lib/event-utils";

interface EventsCarouselProps {
  events: StartupEvent[];
  maxEvents?: number;
}

export function EventsCarousel({ events, maxEvents = 10 }: EventsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Limit events to maxEvents
  const displayEvents = events.slice(0, maxEvents);
  const totalEvents = displayEvents.length;

  // Calculate how many cards to show per view based on screen size
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const updateCardsPerView = () => {
      const container = carouselRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      
      // Mobile: 1 card, Tablet: 2 cards, Desktop: 3 cards
      let newCardsPerView = 1;
      if (containerWidth >= 1024) {
        newCardsPerView = 3;
      } else if (containerWidth >= 768) {
        newCardsPerView = 2;
      } else {
        newCardsPerView = 1;
      }

      setCardsPerView(newCardsPerView);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, [displayEvents.length]);

  const maxIndex = Math.max(0, totalEvents - cardsPerView);

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (totalEvents === 0) {
    return (
      <div className="events-carousel-empty">
        <p>No upcoming events at this time.</p>
      </div>
    );
  }

  return (
    <div className="events-carousel-container">
      <div className="events-carousel-header">
        <h2 className="events-carousel-title">Startup Events</h2>
        {totalEvents > cardsPerView && (
          <div className="events-carousel-controls">
            <button
              type="button"
              className="events-carousel-btn events-carousel-btn-prev"
              onClick={goToPrev}
              disabled={currentIndex === 0}
              aria-label="Previous events"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="events-carousel-indicator">
              {currentIndex + 1} / {maxIndex + 1}
            </span>
            <button
              type="button"
              className="events-carousel-btn events-carousel-btn-next"
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next events"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      <div
        ref={carouselRef}
        className="events-carousel-wrapper"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <ul
          className="events-carousel-list"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 20}px))`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {displayEvents.map((event, index) => (
            <EventByCountryCard
              key={event.url || event.id || index}
              event={event}
              imageUrl={getEventImage(event)}
            />
          ))}
        </ul>
      </div>

      {/* Dots indicator for mobile */}
      {totalEvents > cardsPerView && (
        <div className="events-carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`events-carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

