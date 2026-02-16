import { EventsRepository } from '../repository/events.repository';
import { EventEntity, CreateEventDto, UpdateEventDto } from '../domain/types';
import { getCache, setCache, deleteCache, deleteCacheByPrefix } from '@/shared/cache/redis.client';

export class EventsService {
  constructor(private repository: EventsRepository) {}

  async getAllEvents(filters?: {
    location?: string;
    status?: string;
    limit?: number;
    offset?: number;
    search?: string;
  }): Promise<EventEntity[]> {
    // When fetching upcoming, mark expired events as past so DB status stays correct
    if (filters?.status === 'upcoming') {
      await this.repository.markPastEventsAsExpired();
      await deleteCacheByPrefix('events:all:');
    }

    const cacheKey = `events:all:${JSON.stringify(filters)}`;
    const cached = await getCache<EventEntity[]>(cacheKey);
    if (cached) return cached;

    const events = await this.repository.findAll(filters);

    await setCache(cacheKey, events, 300);
    return events;
  }

  async countEvents(filters?: {
    location?: string;
    status?: string;
    search?: string;
  }): Promise<number> {
    return this.repository.count(filters);
  }

  async getEventById(id: number): Promise<EventEntity | null> {
    const cacheKey = `event:id:${id}`;
    
    const cached = await getCache<EventEntity>(cacheKey);
    if (cached) return cached;

    const entity = await this.repository.findById(id);
    if (entity) {
      await setCache(cacheKey, entity, 600); // Cache for 10 minutes
    }
    return entity;
  }

  async getEventBySlug(slug: string): Promise<EventEntity | null> {
    const cacheKey = `event:slug:${slug}`;
    
    const cached = await getCache<EventEntity>(cacheKey);
    if (cached) return cached;

    const entity = await this.repository.findBySlug(slug);
    if (entity) {
      await setCache(cacheKey, entity, 600); // Cache for 10 minutes
    }
    return entity;
  }

  /**
   * Create event
   */
  async createEvent(data: CreateEventDto): Promise<EventEntity> {
    // Check if slug exists
    const slugExists = await this.repository.slugExists(data.slug);
    if (slugExists) {
      throw new Error(`Event with slug "${data.slug}" already exists`);
    }

    // Convert eventDate string to Date if needed
    const eventDate = typeof data.eventDate === 'string' ? new Date(data.eventDate) : data.eventDate;

    const entity = await this.repository.create({
      ...data,
      eventDate,
    });
    
    // Invalidate cache
    await this.invalidateEventCache();
    
    return entity;
  }

  /**
   * Update event
   */
  async updateEvent(id: number, data: Partial<CreateEventDto>): Promise<EventEntity> {
    const existingEvent = await this.repository.findById(id);
    if (!existingEvent) {
      throw new Error(`Event with ID ${id} not found`);
    }

    // If slug is being updated, check if it exists
    if (data.slug && data.slug !== existingEvent.slug) {
      const slugExists = await this.repository.slugExists(data.slug, id);
      if (slugExists) {
        throw new Error(`Event with slug "${data.slug}" already exists`);
      }
    }

    // Convert camelCase to snake_case for database
    const updateData: Partial<EventEntity> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.eventDate !== undefined) {
      updateData.event_date = typeof data.eventDate === 'string' ? new Date(data.eventDate) : data.eventDate;
    }
    if (data.eventTime !== undefined) updateData.event_time = data.eventTime;
    if (data.imageUrl !== undefined) updateData.image_url = data.imageUrl;
    if (data.externalUrl !== undefined) updateData.external_url = data.externalUrl;
    if (data.status !== undefined) updateData.status = data.status;

    const entity = await this.repository.update(id, updateData);
    
    // Invalidate cache
    await this.invalidateEventCache();
    if (entity.slug) {
      await deleteCache(`event:slug:${entity.slug}`);
    }
    await deleteCache(`event:id:${id}`);
    
    return entity;
  }

  /**
   * Delete event
   */
  async deleteEvent(id: number): Promise<void> {
    const event = await this.repository.findById(id);
    if (!event) {
      throw new Error(`Event with ID ${id} not found`);
    }

    await this.repository.delete(id);
    
    // Invalidate cache
    await this.invalidateEventCache();
    await deleteCache(`event:slug:${event.slug}`);
    await deleteCache(`event:id:${id}`);
  }

  /**
   * Invalidate all event caches so public events section and admin see fresh data
   */
  private async invalidateEventCache(): Promise<void> {
    await Promise.all([
      deleteCacheByPrefix('events:all:'),
      deleteCacheByPrefix('events:by-region:'),
    ]);
  }
}

