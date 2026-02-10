import Image from "next/image";
import { notFound } from "next/navigation";
import { getEventsByRegion, getEventImage, EVENTS_REGION_ORDER } from "@/lib/data-adapter";

// Helper to convert region name to slug (e.g. "Delhi NCR" -> "delhi-ncr")
function slugify(text: string) {
    return text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

// Helper to find region from slug
function getRegionFromSlug(slug: string) {
    return EVENTS_REGION_ORDER.find((r) => slugify(r) === slug);
}

// Generate static params for all known regions (limited to prevent excessive generation)
export function generateStaticParams() {
    // Only pre-generate pages for known regions from config
    // This prevents generating pages for every possible slug
    return EVENTS_REGION_ORDER.map((region) => ({
        slug: slugify(region),
    }));
}

// Enable ISR - regenerate pages every hour
export const revalidate = 3600; // 1 hour

// Don't allow dynamic params - only known regions should be accessible
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const region = getRegionFromSlug(slug);

    if (!region) {
        return {
            title: "Event Not Found - StartupNews.fyi",
        };
    }

    return {
        title: `${region} Events - StartupNews.fyi`,
        description: `Startup and technology events in ${region}.`,
    };
}

export default async function RegionEventsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const region = getRegionFromSlug(slug);

    if (!region) {
        notFound();
    }

    const eventsByRegion = await getEventsByRegion();
    const upcomingEvents = eventsByRegion[region] || [];

    // Generate some consistent mock past events based on the region
    const mockPastEvents = [
        {
            location: region,
            date: `10 January 2025`,
            title: `${region} Tech Summit 2025 | 10-11 January`,
            url: "#",
            excerpt: `The premier technology gathering in ${region} brought together industry leaders...`,
            image: "https://images.unsplash.com/photo-1512418490979-92798cec1380?w=600&q=80"
        },
        {
            location: region,
            date: `05 December 2024`,
            title: `Startup Connect ${region} 2024 | 05 December`,
            url: "#",
            excerpt: `Networking event for founders and investors in the heart of ${region}...`,
            image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80"
        }
    ];

    return (
        <div className="mvp-main-blog-wrap left relative mvp-main-blog-marg event-by-country-page">
            <div className="mvp-main-box">
                <div className="mvp-main-blog-cont left relative">
                    <div className="mvp-main-blog-out left relative event-by-country-out">
                        <div className="mvp-main-blog-in event-by-country-in">
                            <div className="mvp-main-blog-body left relative event-by-country-body">

                                {/* Upcoming Events Section */}
                                <section className="event-by-country-section" style={{ paddingTop: "40px" }}>
                                    <h2 className="event-by-country-region">Events In {region}</h2>
                                    {upcomingEvents.length > 0 ? (
                                        <ul className="event-by-country-list">
                                            {upcomingEvents.map((event) => (
                                                <li key={event.url || event.id} className="event-by-country-card">
                                                    <a
                                                        href={event.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="event-by-country-card-link"
                                                    >
                                                        <div className="event-by-country-card-img">
                                                            <Image
                                                                src={getEventImage(event)}
                                                                alt={event.title}
                                                                fill
                                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No upcoming events found for {region} at this time.</p>
                                    )}
                                </section>

                                {/* Past Events Section */}
                                <section className="event-by-country-section">
                                    <h2 className="event-by-country-region">Past Events In {region}</h2>
                                    <ul className="event-by-country-list">
                                        {mockPastEvents.map((event) => (
                                            <li key={event.title} className="event-by-country-card" style={{ opacity: 0.8 }}>
                                                <a
                                                    href={event.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="event-by-country-card-link"
                                                >
                                                    <div className="event-by-country-card-img">
                                                        <Image
                                                            src={event.image}
                                                            alt={event.title}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            style={{ objectFit: "cover", filter: "grayscale(30%)" }}
                                                        />
                                                    </div>
                                                    <div className="event-by-country-card-content">
                                                        <span className="event-by-country-date">{event.date}</span>
                                                        <h3 className="event-by-country-card-title">{event.title}</h3>
                                                        {event.excerpt && (
                                                            <p className="event-by-country-excerpt">{event.excerpt}</p>
                                                        )}
                                                        <span className="event-by-country-badge" style={{ background: "#666" }}>PAST</span>
                                                    </div>
                                                </a>
                                                <span className="event-by-country-book-btn" style={{ background: "#ccc", cursor: "default" }}>
                                                    Event Ended
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
