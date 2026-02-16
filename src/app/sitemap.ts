import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/data-adapter';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://startupnews.thebackend.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: new Date(), changeFrequency: 'hourly', priority: 1.0 },
        { url: `${SITE_URL}/news`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
        { url: `${SITE_URL}/events`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
        { url: `${SITE_URL}/events/event-by-country`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 },
        { url: `${SITE_URL}/sectors`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
        { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.4 },
        { url: `${SITE_URL}/contact-us`, changeFrequency: 'monthly', priority: 0.4 },
        { url: `${SITE_URL}/advertise-with-us`, changeFrequency: 'monthly', priority: 0.4 },
        { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
        { url: `${SITE_URL}/terms-and-conditions`, changeFrequency: 'yearly', priority: 0.2 },
        { url: `${SITE_URL}/return-refund-policy`, changeFrequency: 'yearly', priority: 0.2 },
    ];

    // Category pages
    const categorySlugs = [
        'artificial-intelligence', 'fintech', 'social-media', 'mobility',
        'agritech', 'ecommerce', 'web-3', 'health-tech',
        'cyber-security', 'space-tech', 'foodtech', 'edtech',
        'entertainment', 'business', 'tech',
    ];
    const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
        url: `${SITE_URL}/category/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }));

    // Sector pages
    const sectorSlugs = [
        'ai-deeptech', 'fintech', 'ecommerce', 'blockchain', 'healthtech',
        'social-media', 'ev-mobility', 'agritech', 'edtech', 'foodtech',
        'web3', 'spacetech', 'cleantech', 'cyber-security', 'd2c', 'e-sports',
    ];
    const sectorPages: MetadataRoute.Sitemap = sectorSlugs.map((slug) => ({
        url: `${SITE_URL}/sectors/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.6,
    }));

    // Dynamic post pages
    let postPages: MetadataRoute.Sitemap = [];
    try {
        const posts = await getAllPosts(500);
        postPages = posts.map((post) => ({
            url: `${SITE_URL}/post/${post.slug}`,
            lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(post.date),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));
    } catch (e) {
        console.error('[Sitemap] Failed to fetch posts:', e);
    }

    return [...staticPages, ...categoryPages, ...sectorPages, ...postPages];
}
