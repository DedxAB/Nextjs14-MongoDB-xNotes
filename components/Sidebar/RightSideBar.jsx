import Link from 'next/link';

import { fetchLatestNews } from '@/services/news/news.service';
import { BASE_URL } from '@/utils/constants';

import NewsArticle from '../NewsArticle';

export default async function RightSideBar() {
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
        <Link href={`${BASE_URL}/news`} className="pr-2 text-primary">
          View all
        </Link>
      </div>

      {data.map((article, index) => (
        <NewsArticle key={index} article={article} />
      ))}
    </div>
  );
}
