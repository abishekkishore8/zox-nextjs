import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/shared/middleware/auth.middleware';
import { EventsService } from '@/modules/events/service/events.service';
import { EventsRepository } from '@/modules/events/repository/events.repository';
import { entityToEvent } from '@/modules/events/utils/events.utils';

// Initialize services
const eventsRepository = new EventsRepository();
const eventsService = new EventsService(eventsRepository);

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/events/[id]
 * Get event by ID
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const eventId = parseInt(id);

    if (isNaN(eventId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid event ID',
        },
        { status: 400 }
      );
    }

    const entity = await eventsService.getEventById(eventId);

    if (!entity) {
      return NextResponse.json(
        {
          success: false,
          error: 'Event not found',
        },
        { status: 404 }
      );
    }

    const event = entityToEvent(entity);

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch event',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/events/[id]
 * Update event
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const eventId = parseInt(id);

    if (isNaN(eventId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid event ID',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updateData: Partial<{
      title: string;
      slug: string;
      excerpt: string;
      description: string;
      location: string;
      eventDate: Date | string;
      eventTime: string;
      imageUrl: string;
      externalUrl: string;
      status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
    }> = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.location !== undefined) updateData.location = body.location;
    if (body.eventDate !== undefined) updateData.eventDate = body.eventDate;
    if (body.eventTime !== undefined) updateData.eventTime = body.eventTime;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.externalUrl !== undefined) updateData.externalUrl = body.externalUrl;
    if (body.status !== undefined) updateData.status = body.status;

    const entity = await eventsService.updateEvent(eventId, updateData);
    const event = entityToEvent(entity);

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update event',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/events/[id]
 * Delete event
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const eventId = parseInt(id);

    if (isNaN(eventId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid event ID',
        },
        { status: 400 }
      );
    }

    await eventsService.deleteEvent(eventId);

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete event',
      },
      { status: 500 }
    );
  }
}

