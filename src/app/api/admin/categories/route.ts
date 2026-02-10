import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/shared/middleware/auth.middleware';
import { CategoriesService } from '@/modules/categories/service/categories.service';
import { CategoriesRepository } from '@/modules/categories/repository/categories.repository';

// Initialize services
const categoriesRepository = new CategoriesRepository();
const categoriesService = new CategoriesService(categoriesRepository);

/**
 * GET /api/admin/categories
 * Get all categories with pagination
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const filters: {
      limit?: number;
      offset?: number;
      search?: string;
    } = {
      limit: Math.min(limit, 100), // Max 100 items per page
      offset,
    };

    if (search) {
      filters.search = search;
    }

    // Get total count for pagination
    const countFilters: { search?: string } = {};
    if (search) countFilters.search = search;

    const total = await categoriesService.countCategories(countFilters);
    const categories = await categoriesService.getAllCategories(filters);

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
  const auth = await requireAdmin(request);
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
