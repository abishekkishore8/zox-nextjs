/**
 * User domain types
 */

/**
 * User entity (database representation)
 */
export interface UserEntity {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: 'admin' | 'editor' | 'author';
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
  is_active: boolean;
}

/**
 * User DTO (domain/API representation - without password)
 */
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'author';
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

/**
 * DTOs for API
 */
export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'editor' | 'author';
  avatarUrl?: string;
}

export interface UpdateUserDto {
  id: number;
  email?: string;
  name?: string;
  role?: 'admin' | 'editor' | 'author';
  avatarUrl?: string;
  isActive?: boolean;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

