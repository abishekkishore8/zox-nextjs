import type { RssFeedEntity } from '../domain/types';
import type { ProcessAllFeedsResult, ProcessFeedResult } from '../domain/types';
import { RssFeedsRepository } from '../repository/rss-feeds.repository';
import { RssParserService } from './rss-parser.service';
import { RssPostCreatorService } from './rss-post-creator.service';

export class RssFeedsService {
  private repo = new RssFeedsRepository();
  private parser = new RssParserService();
  private postCreator = new RssPostCreatorService();

  async processAllFeeds(): Promise<ProcessAllFeedsResult> {
    const feeds = await this.repo.findEnabled();
    const result: ProcessAllFeedsResult = {
      totalFeeds: feeds.length,
      processed: 0,
      created: 0,
      errors: [],
      feedSummaries: [],
    };

    // Process every enabled feed in this run (all at once, every 10 min)
    for (const feed of feeds) {
      if (!this.shouldFetch(feed)) continue;
      try {
        const feedResult = await this.processFeed(feed);
        result.processed++;
        result.created += feedResult.postsCreated;
        result.feedSummaries.push({
          feedName: feed.name,
          itemsInFeed: feedResult.itemsInFeed,
          newItems: feedResult.newItems,
          created: feedResult.postsCreated,
        });
        await this.repo.updateLastFetched(feed.id, null);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        result.errors.push({ feedId: feed.id, feedName: feed.name, error: message });
        await this.repo.updateLastFetched(feed.id, message);
      }
    }

    return result;
  }

  async processFeed(feed: RssFeedEntity): Promise<ProcessFeedResult> {
    const { items, feedImageUrl } = await this.parser.fetchAndParse(feed.url);

    if (feedImageUrl) {
      await this.repo.update(feed.id, { logo_url: feedImageUrl });
    }

    const toProcess = [...items];
    const newItems: typeof items = [];
    for (const item of toProcess) {
      const exists = await this.repo.itemExistsByGuid(feed.id, item.guid);
      if (!exists) newItems.push(item);
    }

    const limited = newItems.slice(0, feed.max_items_per_fetch || 10);
    const errors: string[] = [];
    let postsCreated = 0;

    for (const item of limited) {
      try {
        const savedItem = await this.repo.saveFeedItem({
          rss_feed_id: feed.id,
          guid: item.guid,
          title: item.title,
          link: item.link,
          author: item.author ?? null,
          description: item.description ?? null,
          content: item.content ?? null,
          image_url: item.imageUrl ?? null,
          published_at: item.publishedAt ?? null,
        });

        const { postId } = await this.postCreator.createPostFromRssItem(item, feed);
        await this.repo.linkItemToPost(savedItem.id, postId);
        postsCreated++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`Item ${item.guid}: ${msg}`);
      }
    }

    return {
      itemsInFeed: items.length,
      newItems: limited.length,
      postsCreated,
      itemsProcessed: limited.length,
      errors,
    };
  }

  /** Return true so we fetch every time the cron runs (every 10 min). Interval is for future use. */
  private shouldFetch(_feed: RssFeedEntity): boolean {
    return true;
  }
}
