import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { inter_font, josefin_sans_font } from '@/utils/fonts';

const NewsArticle = ({ article }) => {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-col border rounded-lg shadow-lg space-y-4 mb-4 overflow-hidden">
        {/* Thumbnail */}
        {article.thumbnail && (
          <Image
            src={article.thumbnail}
            alt={article.title}
            className="w-full object-cover"
            width={512}
            height={512}
            priority
          />
        )}

        <div className="flex flex-col px-4 pb-4">
          {/* Source and Publication Date */}
          <div
            className={cn(
              'flex items-center text-xs space-x-2 mb-2',
              josefin_sans_font
            )}
          >
            {article.source?.favicon && (
              <Link
                href={article.source?.url ? article.source?.url : ''}
                target="_blank"
              >
                <Image
                  src={article.source.favicon}
                  alt={`${article.source.name} favicon`}
                  className="w-4 h-4 mb-1"
                  width={512}
                  height={512}
                  priority
                />
              </Link>
            )}
            <Link
              href={article.source?.url ? article.source?.url : ''}
              target="_blank"
            >
              {article.source.name}
            </Link>
            <span>&bull;</span>
            <span>{dayjs(article.date).format('MMM D, YYYY')}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold">{article.title}</h3>

          {/* Description */}
          <p className={cn('text-sm my-2', inter_font)}>
            {article.description}
          </p>

          <div className="flex items-end justify-between">
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
              className={cn('text-primary text-sm hover:underline', inter_font)}
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
