/**
 * Data Adapter Layer
 * 
 * This adapter provides data access functions that use the database.
 * All static/mock data has been removed - database is now required.
 */

import { PostsService } from '@/modules/posts/service/posts.service';
import { PostsRepository } from '@/modules/posts/repository/posts.repository';
import { EventsService } from '@/modules/events/service/events.service';
import { EventsRepository } from '@/modules/events/repository/events.repository';
import { CategoriesService } from '@/modules/categories/service/categories.service';
import { CategoriesRepository } from '@/modules/categories/repository/categories.repository';
import { entityToPost, entitiesToPosts } from '@/modules/posts/utils/posts.utils';
import { entityToEvent } from '@/modules/events/utils/events.utils';
import type { StartupEvent } from '@/modules/events/domain/types';

// Post interface (backward compatible)
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  date: string;
  timeAgo: string;
  image: string;
  imageSmall?: string;
  format?: "standard" | "video" | "gallery";
  featured?: boolean;
  tags?: string[];
}

// Initialize services
const categoriesRepository = new CategoriesRepository();
const categoriesService = new CategoriesService(categoriesRepository);
const postsRepository = new PostsRepository();
const postsService = new PostsService(postsRepository, categoriesService);
const eventsRepository = new EventsRepository();
const eventsService = new EventsService(eventsRepository);

// Events region order (static configuration, not data)
export const EVENTS_REGION_ORDER = [
  "Bengaluru",
  "Cohort",
  "Delhi NCR",
  "Dubai",
  "Hyderabad",
  "International Events",
  "Mumbai",
  "Other Cities",
] as const;

// Default event image
const DEFAULT_EVENT_IMAGE = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80";

export function getEventImage(event: StartupEvent): string {
  return event.image || DEFAULT_EVENT_IMAGE;
}

/**
 * Posts Functions - Database Only
 */
export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const entities = await postsService.getFeaturedPosts(5);
    return entitiesToPosts(entities);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    throw new Error('Failed to fetch featured posts from database');
  }
}

export async function getFeat1LeftPosts(): Promise<{ main: Post; sub: [Post, Post] }> {
  try {
    const entities = await postsService.getFeaturedPosts(3);
    if (entities.length < 3) {
      throw new Error('Not enough featured posts in database (need at least 3)');
    }
    const main = await entityToPost(entities[0]);
    const sub1 = await entityToPost(entities[1]);
    const sub2 = await entityToPost(entities[2]);
    return { main, sub: [sub1, sub2] };
  } catch (error) {
    console.error('Error fetching feat1 left posts:', error);
    throw error;
  }
}

export async function getTrendingPosts(): Promise<Post[]> {
  try {
    const featured = await postsService.getFeaturedPosts(3);
    const excludeIds = featured.map((p) => p.id.toString());
    const entities = await postsService.getTrendingPosts(5, excludeIds);
    return await entitiesToPosts(entities);
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    throw new Error('Failed to fetch trending posts from database');
  }
}

export async function getFeat1ListPosts(excludeIds: string[] = []): Promise<Post[]> {
  try {
    const excludeNums = excludeIds.map((id) => parseInt(id)).filter((id) => !isNaN(id));
    const entities = await postsService.getAllPosts({ 
      status: 'published',
      limit: 13,
    });
    const filtered = entities.filter((e) => !excludeNums.includes(e.id));
    return await entitiesToPosts(filtered.slice(0, 13));
  } catch (error) {
    console.error('Error fetching feat1 list posts:', error);
    throw new Error('Failed to fetch feat1 list posts from database');
  }
}

export async function getMoreNewsPosts(excludeIds: string[] = []): Promise<Post[]> {
  try {
    const excludeNums = excludeIds.map((id) => parseInt(id)).filter((id) => !isNaN(id));
    const entities = await postsService.getAllPosts({ status: 'published' });
    const filtered = entities.filter((e) => !excludeNums.includes(e.id));
    return await entitiesToPosts(filtered);
  } catch (error) {
    console.error('Error fetching more news posts:', error);
    throw new Error('Failed to fetch more news posts from database');
  }
}

export async function getPostsByCategory(categorySlug: string, limit = 10): Promise<Post[]> {
  try {
    const entities = await postsService.getPostsByCategory(categorySlug, limit);
    return await entitiesToPosts(entities);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    throw new Error(`Failed to fetch posts for category ${categorySlug} from database`);
  }
}

export async function getCategorySectionPosts(categorySlug: string): Promise<{
  featured: Post | null;
  right: [Post, Post];
  list: Post[];
}> {
  try {
    const posts = await getPostsByCategory(categorySlug, 9);
    const featured = posts[0] || null;
    const right: [Post, Post] = [posts[1], posts[2]].filter(Boolean) as [Post, Post];
    const list = posts.slice(3, 9);
    
    // Fill gaps if needed
    if (right.length < 2) {
      const allPosts = await getAllPosts();
      const extra = allPosts
        .filter((p) => p.categorySlug !== categorySlug)
        .slice(0, 2 - right.length);
      right.push(...extra);
    }
    
    if (list.length < 3) {
      const allPosts = await getAllPosts();
      list.push(
        ...allPosts
          .filter((p) => !list.find((x) => x.id === p.id))
          .slice(0, 6 - list.length)
      );
    }
    
    return { featured, right: right as [Post, Post], list };
  } catch (error) {
    console.error('Error fetching category section posts:', error);
    throw error;
  }
}

export async function getDarkSectionPosts(categorySlug: string): Promise<{
  featured: Post | null;
  list: Post[];
}> {
  try {
    const posts = await getPostsByCategory(categorySlug, 5);
    const featured = posts[0] || null;
    let list = posts.slice(1, 5);
    
    if (list.length < 4) {
      const allPosts = await getAllPosts();
      list = list.concat(
        allPosts
          .filter((p) => !list.find((x) => x.id === p.id) && p.id !== featured?.id)
          .slice(0, 4 - list.length)
      );
    }
    
    return { featured, list };
  } catch (error) {
    console.error('Error fetching dark section posts:', error);
    throw error;
  }
}

export async function getFeat1SectionPosts(categorySlug: string): Promise<{
  top: [Post, Post];
  bottom: [Post, Post, Post, Post];
}> {
  try {
    const posts = await getPostsByCategory(categorySlug, 6);
    const top: [Post, Post] = [posts[0], posts[1]].filter(Boolean) as [Post, Post];
    let bottom = posts.slice(2, 6) as Post[];
    
    if (top.length < 2) {
      const allPosts = await getAllPosts();
      const extra = allPosts
        .filter((p) => !top.find((x) => x.id === p.id))
        .slice(0, 2 - top.length);
      (top as Post[]).push(...extra);
    }
    
    if (bottom.length < 4) {
      const allPosts = await getAllPosts();
      bottom = bottom.concat(
        allPosts
          .filter((p) => !bottom.find((x) => x.id === p.id) && !top.find((x) => x.id === p.id))
          .slice(0, 4 - bottom.length)
      ) as [Post, Post, Post, Post];
    }
    
    return { top: top as [Post, Post], bottom: bottom as [Post, Post, Post, Post] };
  } catch (error) {
    console.error('Error fetching feat1 section posts:', error);
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const entity = await postsService.getPostBySlug(slug);
    if (!entity) return undefined;
    return entityToPost(entity);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw new Error(`Failed to fetch post ${slug} from database`);
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const entities = await postsService.getAllPosts({ status: 'published' });
    return await entitiesToPosts(entities);
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw new Error('Failed to fetch posts from database');
  }
}

export async function getRelatedPosts(
  excludeSlug: string,
  categorySlug: string,
  limit = 6
): Promise<Post[]> {
  try {
    const entities = await postsService.getRelatedPosts(excludeSlug, categorySlug, limit);
    return await entitiesToPosts(entities);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    throw new Error('Failed to fetch related posts from database');
  }
}

export async function getPrevNextPosts(currentSlug: string): Promise<{
  prev: Post | null;
  next: Post | null;
}> {
  try {
    const { prev, next } = await postsService.getPrevNextPosts(currentSlug);
    return {
      prev: prev ? await entityToPost(prev) : null,
      next: next ? await entityToPost(next) : null,
    };
  } catch (error) {
    console.error('Error fetching prev/next posts:', error);
    throw new Error('Failed to fetch prev/next posts from database');
  }
}

export async function getVideoPosts(limit = 10): Promise<Post[]> {
  try {
    const entities = await postsService.getAllPosts({ 
      status: 'published',
      limit,
    });
    const videoEntities = entities.filter((e) => e.format === 'video');
    return await entitiesToPosts(videoEntities.slice(0, limit));
  } catch (error) {
    console.error('Error fetching video posts:', error);
    throw new Error('Failed to fetch video posts from database');
  }
}

/**
 * Events Functions - Database Only
 */
export async function getEventsByRegion(): Promise<Record<string, StartupEvent[]>> {
  try {
    const entities = await eventsService.getAllEvents({ status: 'upcoming' });
    const eventsByRegion: Record<string, StartupEvent[]> = {};
    
    for (const region of EVENTS_REGION_ORDER) {
      eventsByRegion[region] = entities
        .filter((e) => e.location === region)
        .map((e) => entityToEvent(e));
    }
    
    return eventsByRegion;
  } catch (error) {
    console.error('Error fetching events by region:', error);
    throw new Error('Failed to fetch events from database');
  }
}

/**
 * Get all startup events from database
 * This replaces the static startupEvents constant
 */
export async function getStartupEvents(): Promise<StartupEvent[]> {
  try {
    const entities = await eventsService.getAllEvents({ status: 'upcoming' });
    return entities.map((e) => entityToEvent(e));
  } catch (error) {
    console.error('Error fetching startup events:', error);
    throw new Error('Failed to fetch startup events from database');
  }
}

// Re-export types for backward compatibility
export type { StartupEvent } from '@/modules/events/domain/types';
