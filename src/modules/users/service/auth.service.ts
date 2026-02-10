import { UsersService } from './users.service';
import { User } from '../domain/types';
import jwt, { SignOptions } from 'jsonwebtoken';

// Ensure JWT_SECRET is always a string (required for jwt.sign)
const JWT_SECRET: string = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN: string = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// Validate JWT_SECRET is not empty
if (!JWT_SECRET || JWT_SECRET.trim() === '') {
  throw new Error('JWT_SECRET environment variable is required and cannot be empty');
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * Generate JWT token
   */
  generateToken(user: User): string {
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    } as SignOptions);
  }

  /**
   * Generate refresh token
   */
  generateRefreshToken(user: User): string {
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    } as SignOptions);
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  /**
   * Login and return user with token
   */
  async login(email: string, password: string): Promise<{
    user: User;
    token: string;
    refreshToken: string;
  }> {
    const { user } = await this.usersService.login({ email, password });
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      user,
      token,
      refreshToken,
    };
  }

  /**
   * Verify if user has required role
   */
  hasRole(user: User, requiredRole: 'admin' | 'editor' | 'author'): boolean {
    const roleHierarchy: Record<string, number> = {
      admin: 3,
      editor: 2,
      author: 1,
    };

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  }

  /**
   * Check if user is admin
   */
  isAdmin(user: User): boolean {
    return user.role === 'admin';
  }
}

