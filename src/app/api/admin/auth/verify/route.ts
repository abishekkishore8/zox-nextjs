import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/shared/middleware/auth.middleware';

/**
 * GET /api/admin/auth/verify
 * Verify authentication token
 */
export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthUser(request);

    if (!auth) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    // Only allow admin and editor roles
    if (auth.user.role !== 'admin' && auth.user.role !== 'editor') {
      return NextResponse.json(
        {
          success: false,
          error: 'Access denied',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        user: auth.user,
      },
    });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Verification failed',
      },
      { status: 500 }
    );
  }
}

