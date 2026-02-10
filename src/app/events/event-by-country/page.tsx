import Image from "next/image";
import { getEventsByRegion, EVENTS_REGION_ORDER, getEventImage } from "@/lib/data-adapter";

export const metadata = {
  title: "Events by Country - StartupNews.fyi",
  description: "Startup and technology events by country and city.",
};

export default async function EventByCountryPage() {
  const eventsByRegion = await getEventsByRegion();

  return (
    <div className="mvp-main-blog-wrap left relative mvp-main-blog-marg event-by-country-page">
      <div className="mvp-main-box">
        <div className="mvp-main-blog-cont left relative">
          <div className="mvp-main-blog-out left relative event-by-country-out">
            <div className="mvp-main-blog-in event-by-country-in">
              <div className="mvp-main-blog-body left relative event-by-country-body">

                {EVENTS_REGION_ORDER.map((region) => {
                  const events = eventsByRegion[region];
                  if (!events || events.length === 0) return null;

                  return (
                    <section key={region} className="event-by-country-section">
                      <h2 className="event-by-country-region">{`Events In ${region}`}</h2>
                      <ul className="event-by-country-list">
                        {events.map((event) => (
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
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
