import Image from "next/image";
import type { StartupEvent } from "@/lib/data-adapter";

interface EventByCountryCardProps {
  event: StartupEvent;
  imageUrl: string;
}

/**
 * Shared event card for /events and /events/[slug].
 * Layout: image, content (date, title, excerpt), badge, Book now button.
 */
export function EventByCountryCard({ event, imageUrl }: EventByCountryCardProps) {
  const detailUrl = event.slug ? `/startup-events/${event.slug}` : event.url;
  const isInternal = Boolean(event.slug);

  return (
    <li className="event-by-country-card">
      <a
        href={detailUrl}
        {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="event-by-country-card-link"
        aria-label={`View event: ${event.title}`}
      >
        <div className="event-by-country-card-img">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="event-by-country-card-content">
          <span className="event-by-country-date">{event.date}</span>
          <h3 className="event-by-country-card-title">{event.title}</h3>
          {event.excerpt && (
            <p className="event-by-country-excerpt">{event.excerpt}</p>
          )}
          <span className="event-by-country-badge">UPCOMING</span>
        </div>
      </a>
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="event-by-country-book-btn"
      >
        Book now
      </a>
    </li>
  );
}
