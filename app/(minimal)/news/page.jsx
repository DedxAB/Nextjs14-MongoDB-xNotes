import NewsArticle from '@/components/NewsArticle';
import { fetchLatestNews } from '@/services/news/news.service';

export default async function NewsPage() {
  const data = await fetchLatestNews();

  if (!data || !data.length) {
    return (
      <div className="grid place-items-center h-[20vh]">
        Latest news is currently unavailable. Please check back later.
      </div>
    );
  }

  return (
    <div className="pt-6">
      <h1 className="text-lg font-bold mb-4">Latest Tech News</h1>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 break-inside">
        {data.map((article, index) => (
          <NewsArticle key={index} article={article} />
        ))}
      </div>
    </div>
  );
}
