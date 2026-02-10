import { NextRequest, NextResponse } from 'next/server';
import { PostsService } from '@/modules/posts/service/posts.service';
import { PostsRepository } from '@/modules/posts/repository/posts.repository';
import { CategoriesService } from '@/modules/categories/service/categories.service';
import { CategoriesRepository } from '@/modules/categories/repository/categories.repository';
import { entitiesToPosts } from '@/modules/posts/utils/posts.utils';

// Initialize services
const categoriesRepository = new CategoriesRepository();
const categoriesService = new CategoriesService(categoriesRepository);
const postsRepository = new PostsRepository();
const postsService = new PostsService(postsRepository, categoriesService);

/**
 * GET /api/search
 * Search posts and events
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q');
    const type = searchParams.get('type') || 'posts'; // 'posts', 'events', or 'all'
    const limit = searchParams.get('limit');

    if (!q || q.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search query is required',
        },
        { status: 400 }
      );
    }

    const searchLimit = limit ? parseInt(limit) : 20;
    const validLimit = !isNaN(searchLimit) && searchLimit > 0 ? searchLimit : 20;

    const results: {
      posts?: any[];
      events?: any[];
    } = {};

    if (type === 'posts' || type === 'all') {
      const postEntities = await postsService.searchPosts(q, validLimit);
      results.posts = await entitiesToPosts(postEntities);
    }

    // Events search can be added later when EventsService has search method
    // if (type === 'events' || type === 'all') {
    //   const eventEntities = await eventsService.searchEvents(q, validLimit);
    //   results.events = eventEntities.map(entityToEvent);
    // }

    return NextResponse.json({
      success: true,
      data: results,
      query: q,
    });
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search',
      },
      { status: 500 }
    );
  }
}

