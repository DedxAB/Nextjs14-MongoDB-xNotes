import { cache } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { NEWS_API_HOST, NEWS_API_KEY, NEWS_URL } from '@/utils/constants';
import { inter_font, josefin_sans_font } from '@/utils/fonts';

const getData = cache(async () => {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': NEWS_API_KEY,
      'x-rapidapi-host': NEWS_API_HOST,
    },
  };

  const url = `${NEWS_URL}?country=us&language=en&topic=technology`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.error(`API request failed with status ${response.status}`);
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to fetch news data:', error);
    return null;
  }
});

// Revalidate the data every 3600 seconds
export const revalidate = 3600;

export default async function RightSideBar() {
  const data = await getData();

  if (!data || !data.data?.length) {
    return (
      <div className="grid place-items-center h-[20vh]">No news available</div>
    );
  }

  return (
    <div>
      {data?.data?.map((article, index) => (
        <div
          key={index}
          className="flex border rounded-lg shadow-lg p-4 space-x-4 mb-4"
        >
          {/* Thumbnail */}
          <Image
            src={article.thumbnail}
            alt={article.title}
            className="w-24 h-24 object-cover rounded-md"
            width={512}
            height={512}
          />

          <div className="flex flex-col flex-1">
            {/* Source and Publication Date */}
            <div className="flex items-center text-sm space-x-2 mb-2">
              <Image
                src={article.source.favicon}
                alt={`${article.source.name} favicon`}
                className="w-4 h-4"
                width={512}
                height={512}
              />
              <span>{article.source.name}</span>
              <span>&bull;</span>
              <span>{dayjs(article.published_at).format('MMM D, YYYY')}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold">{article.title}</h3>

            {/* Description */}
            <p className={cn('text-sm my-2', inter_font)}>
              {article.description}
            </p>

            {/* Author(s) */}
            {article.authors?.length > 0 && (
              <p className={cn('text-gray-500 text-xs', josefin_sans_font)}>
                By {article.authors.join(', ')}
              </p>
            )}

            {/* Read More Link */}
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm mt-2 hover:underline"
            >
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
