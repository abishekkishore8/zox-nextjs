import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/shared/middleware/auth.middleware';
import { PostsService } from '@/modules/posts/service/posts.service';
import { PostsRepository } from '@/modules/posts/repository/posts.repository';
import { CategoriesService } from '@/modules/categories/service/categories.service';
import { CategoriesRepository } from '@/modules/categories/repository/categories.repository';
import { entityToPost } from '@/modules/posts/utils/posts.utils';

// Initialize services
const categoriesRepository = new CategoriesRepository();
const categoriesService = new CategoriesService(categoriesRepository);
const postsRepository = new PostsRepository();
const postsService = new PostsService(postsRepository, categoriesService);

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/posts/[id]
 * Get post by ID
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid post ID',
        },
        { status: 400 }
      );
    }

    const postEntity = await postsRepository.findById(postId);

    if (!postEntity) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post not found',
        },
        { status: 404 }
      );
    }

    const post = await entityToPost(postEntity);

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch post',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/posts/[id]
 * Update post
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid post ID',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updateData: Partial<{
      title: string;
      slug: string;
      excerpt: string;
      content: string;
      categoryId: number;
      authorId: number;
      featuredImageUrl: string;
      featuredImageSmallUrl: string;
      format: "standard" | "video" | "gallery";
      status: "draft" | "published" | "archived";
      featured: boolean;
    }> = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.categoryId !== undefined) updateData.categoryId = parseInt(body.categoryId);
    if (body.authorId !== undefined) updateData.authorId = parseInt(body.authorId);
    if (body.featuredImageUrl !== undefined) updateData.featuredImageUrl = body.featuredImageUrl;
    if (body.featuredImageSmallUrl !== undefined) updateData.featuredImageSmallUrl = body.featuredImageSmallUrl;
    if (body.format !== undefined) updateData.format = body.format;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.featured !== undefined) updateData.featured = body.featured;

    const entity = await postsService.updatePost(postId, updateData);
    const post = await entityToPost(entity);

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update post',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/posts/[id]
 * Delete post
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid post ID',
        },
        { status: 400 }
      );
    }

    await postsService.deletePost(postId);

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete post',
      },
      { status: 500 }
    );
  }
}

