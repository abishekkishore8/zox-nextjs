import Link from "next/link";
import { startupEvents } from "@/lib/data";

export function StartupEventsSection() {
  return (
    <div className="mvp-feat1-list-wrap left relative startup-events-wrap">
      <h3 className="mvp-feat1-pop-head">
        <Link href="/events/event-by-country" className="sn-external-events-link">
          <span className="mvp-feat1-pop-head">Startup Events</span>
        </Link>
      </h3>
      <div id="mvp-feat-tab-col1" className="mvp-feat1-list left relative mvp-tab-col-cont startup-events-list" style={{ display: "block" }}>
        {startupEvents.slice(0, 17).map((event) => (
          <a key={event.url} href={event.url} rel="noopener noreferrer bookmark" target="_blank" className="startup-events-item">
            <div className="mvp-feat1-list-cont left relative">
              <div className="mvp-feat1-list-text">
                <div className="mvp-cat-date-wrap left relative">
                  <span className="mvp-cd-cat left relative">{event.location}</span>
                  <span className="mvp-cd-sep"> / </span>
                  <span className="mvp-cd-date left relative">{event.date}</span>
                </div>
                <h2>{event.title}</h2>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
