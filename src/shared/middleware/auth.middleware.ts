import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/modules/users/service/auth.service';
import { UsersService } from '@/modules/users/service/users.service';
import { UsersRepository } from '@/modules/users/repository/users.repository';
import { JWTPayload } from '@/modules/users/service/auth.service';
import { User } from '@/modules/users/domain/types';

// Initialize services
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const authService = new AuthService(usersService);

/**
 * Get user from request token
 */
export async function getAuthUser(request: NextRequest): Promise<{
  user: User;
  payload: JWTPayload;
} | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const payload = authService.verifyToken(token);

    if (!payload) {
      return null;
    }

    const user = await usersService.getUserById(payload.userId);
    if (!user || !user.isActive) {
      return null;
    }

    return { user, payload };
  } catch {
    return null;
  }
}

/**
 * Require authentication middleware
 */
export async function requireAuth(
  request: NextRequest,
  requiredRole?: 'admin' | 'editor' | 'author'
): Promise<{
  user: User;
  payload: JWTPayload;
} | NextResponse> {
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

  if (requiredRole && !authService.hasRole(auth.user, requiredRole)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Forbidden - Insufficient permissions',
      },
      { status: 403 }
    );
  }

  return auth;
}

/**
 * Require admin middleware
 */
export async function requireAdmin(
  request: NextRequest
): Promise<{
  user: User;
  payload: JWTPayload;
} | NextResponse> {
  return requireAuth(request, 'admin');
}

