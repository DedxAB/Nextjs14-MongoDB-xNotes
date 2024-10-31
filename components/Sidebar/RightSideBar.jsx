import { fetchLatestNews } from '@/services/news/news.service';
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
      <h1 className="mb-4 text-lg font-bold">Latest Tech News</h1>
      {data.map((article, index) => (
        <NewsArticle key={index} article={article} />
      ))}
    </div>
  );
}
