import { fetchLatestNews } from '@/services/news/news.service';
import NewsArticle from '../NewsArticle';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { BASE_URL } from '@/utils/constants';

export default async function RightSideBar({ useGrid }) {
  const data = await fetchLatestNews();

  if (!data || !data.length) {
    return (
      <div className="grid place-items-center h-[20vh]">
        Latest news is currently unavailable. Please check back later.
      </div>
    );
  }

  return (
    <div>
      <div className="flex mb-4 items-center justify-between">
        <h1 className="text-lg font-bold">Latest Tech News</h1>
        {!useGrid && (
          <Link href={`${BASE_URL}/news`} className="pr-2 text-primary">
            View all
          </Link>
        )}
      </div>

      <div
        className={cn(
          useGrid
            ? 'columns-1 sm:columns-2 lg:columns-3 gap-4 break-inside'
            : ''
        )}
      >
        {data.map((article, index) => (
          <NewsArticle key={index} article={article} />
        ))}
      </div>
    </div>
  );
}
