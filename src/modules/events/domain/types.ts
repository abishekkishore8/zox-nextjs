/**
 * Event domain types
 */

export interface StartupEvent {
  id?: string | number;
  slug?: string;
  location: string;
  date: string;
  title: string;
  url: string;
  excerpt?: string;
  image?: string;
  status?: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
}

/**
 * Database entity
 */
export interface EventEntity {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  description?: string;
  location: string;
  // Dates from MariaDB are returned as strings, but we type them as Date | string for flexibility
  event_date: Date | string;
  event_time?: string;
  image_url?: string;
  external_url?: string;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * DTOs for API
 */
export interface CreateEventDto {
  title: string;
  slug: string;
  excerpt?: string;
  description?: string;
  location: string;
  eventDate: Date | string;
  eventTime?: string;
  imageUrl?: string;
  externalUrl?: string;
  status?: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
}

export interface UpdateEventDto extends Partial<CreateEventDto> {
  id: number;
}

