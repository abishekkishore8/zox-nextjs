import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/shared/middleware/auth.middleware';
import { EventsService } from '@/modules/events/service/events.service';
import { EventsRepository } from '@/modules/events/repository/events.repository';
import { entityToEvent } from '@/modules/events/utils/events.utils';

// Initialize services
const eventsRepository = new EventsRepository();
const eventsService = new EventsService(eventsRepository);

/**
 * GET /api/admin/events
 * Get all events (admin view - includes all statuses) with pagination
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const searchParams = request.nextUrl.searchParams;
    const location = searchParams.get('location');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const filters: {
      location?: string;
      status?: string;
      limit?: number;
      offset?: number;
      search?: string;
    } = {
      limit: Math.min(limit, 100), // Max 100 items per page
      offset,
    };

    if (location) {
      filters.location = location;
    }

    if (status) {
      filters.status = status;
    }

    if (search) {
      filters.search = search;
    }

    // Get total count for pagination
    const countFilters: { location?: string; status?: string; search?: string } = {};
    if (location) countFilters.location = location;
    if (status) countFilters.status = status;
    if (search) countFilters.search = search;

    const total = await eventsService.countEvents(countFilters);
    const entities = await eventsService.getAllEvents(filters);
    const events = entities.map(entityToEvent);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: events,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch events',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/events
 * Create new event
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    
    // Validation
    if (!body.title || !body.slug || !body.location || !body.eventDate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title, slug, location, and event date are required',
        },
        { status: 400 }
      );
    }

    const entity = await eventsService.createEvent({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      description: body.description,
      location: body.location,
      eventDate: body.eventDate,
      eventTime: body.eventTime,
      imageUrl: body.imageUrl,
      externalUrl: body.externalUrl,
      status: body.status || 'upcoming',
    });

    const event = entityToEvent(entity);

    return NextResponse.json({
      success: true,
      data: event,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create event',
      },
      { status: 500 }
    );
  }
}
