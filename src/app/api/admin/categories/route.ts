import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/shared/middleware/auth.middleware';
import { CategoriesService } from '@/modules/categories/service/categories.service';
import { CategoriesRepository } from '@/modules/categories/repository/categories.repository';

export const maxDuration = 60;

// Initialize services
const categoriesRepository = new CategoriesRepository();
const categoriesService = new CategoriesService(categoriesRepository);

/**
 * GET /api/admin/categories
 * Get all categories with pagination
 */
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const parentIdParam = searchParams.get('parentId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const filters: {
      limit?: number;
      offset?: number;
      search?: string;
      parentId?: number | null;
    } = {
      limit: Math.min(limit, 500), // Allow up to 500 so RSS feed create/edit get all categories
      offset,
    };

    if (search) {
      filters.search = search;
    }

    if (parentIdParam !== null && parentIdParam !== undefined) {
      if (parentIdParam === 'top' || parentIdParam === '') {
        filters.parentId = null; // Top-level only
      } else {
        const parsed = parseInt(parentIdParam, 10);
        if (!isNaN(parsed)) filters.parentId = parsed;
      }
    }

    // Get total count for pagination
    const countFilters: { search?: string; parentId?: number | null } = {};
    if (search) countFilters.search = search;
    if (filters.parentId !== undefined) countFilters.parentId = filters.parentId;

    const [total, categories] = await Promise.all([
      categoriesService.countCategories(countFilters),
      categoriesService.getAllCategories(filters),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: categories,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/categories
 * Create new category
 */
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const category = await categoriesService.createCategory(body);

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create category',
      },
      { status: 500 }
    );
  }
}
