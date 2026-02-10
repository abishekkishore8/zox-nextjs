import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/shared/middleware/auth.middleware';
import { PostsService } from '@/modules/posts/service/posts.service';
import { PostsRepository } from '@/modules/posts/repository/posts.repository';
import { CategoriesService } from '@/modules/categories/service/categories.service';
import { CategoriesRepository } from '@/modules/categories/repository/categories.repository';
import { entitiesToPosts, entityToPost } from '@/modules/posts/utils/posts.utils';

// Initialize services
const categoriesRepository = new CategoriesRepository();
const categoriesService = new CategoriesService(categoriesRepository);
const postsRepository = new PostsRepository();
const postsService = new PostsService(postsRepository, categoriesService);

/**
 * GET /api/admin/posts
 * Get all posts (admin view - includes drafts) with pagination
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const filters: {
      status?: string;
      limit?: number;
      offset?: number;
      search?: string;
    } = {
      limit: Math.min(limit, 100), // Max 100 items per page
      offset,
    };

    if (status) {
      filters.status = status;
    }

    if (search) {
      filters.search = search;
    }

    // Get total count for pagination
    const total = await postsRepository.count(filters);
    const entities = await postsService.getAllPosts(filters);
    const posts = await entitiesToPosts(entities);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: posts,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch posts',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/posts
 * Create new post
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    
    // Validation
    if (!body.title || !body.slug || !body.excerpt || !body.content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title, slug, excerpt, and content are required',
        },
        { status: 400 }
      );
    }

    if (!body.categoryId || !body.authorId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category ID and Author ID are required',
        },
        { status: 400 }
      );
    }

    const entity = await postsService.createPost({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      categoryId: parseInt(body.categoryId),
      authorId: parseInt(body.authorId),
      featuredImageUrl: body.featuredImageUrl,
      featuredImageSmallUrl: body.featuredImageSmallUrl,
      format: body.format || 'standard',
      status: body.status || 'draft',
      featured: body.featured || false,
    });

    const post = await entityToPost(entity);

    return NextResponse.json({
      success: true,
      data: post,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post',
      },
      { status: 500 }
    );
  }
}
