/**
 * Client-safe event utilities
 * These functions don't import server-side code (database, Redis, etc.)
 */

import type { StartupEvent } from '@/modules/events/domain/types';

// Default event image
const DEFAULT_EVENT_IMAGE = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80";

/**
 * Get event image URL (client-safe version)
 * Returns the event's image or a default placeholder
 */
export function getEventImage(event: StartupEvent): string {
  return event.image || DEFAULT_EVENT_IMAGE;
}
