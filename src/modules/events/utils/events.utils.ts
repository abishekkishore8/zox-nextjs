import { EventEntity } from '../domain/types';
import { StartupEvent } from '../domain/types';

const DEFAULT_EVENT_IMAGE = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80";
const EVENTS_BASE = "https://startupnews.thebackend.in/startup-events";

/**
 * Convert EventEntity to StartupEvent (backward compatible format)
 */
export function entityToEvent(entity: EventEntity): StartupEvent {
  const eventDate = new Date(entity.event_date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    id: entity.id.toString(),
    slug: entity.slug,
    location: entity.location,
    date: formattedDate,
    title: entity.title,
    url: entity.external_url || `${EVENTS_BASE}/${entity.slug}/`,
    excerpt: entity.excerpt,
    image: entity.image_url || DEFAULT_EVENT_IMAGE,
    status: entity.status,
  };
}

/**
 * Convert array of entities to events
 */
export function entitiesToEvents(entities: EventEntity[]): StartupEvent[] {
  return entities.map(entityToEvent);
}

