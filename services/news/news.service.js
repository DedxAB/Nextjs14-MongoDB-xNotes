import connectDB from '@/db/mongodb';
import News from '@/models/news.model';
import { NEWS_API_HOST, NEWS_API_KEY, NEWS_URL } from '@/utils/constants';
import getRedisClient from '@/utils/redis';

export const fetchNews = async () => {
  const url = `${NEWS_URL}?country=in&language=en&topic=technology`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': NEWS_API_KEY,
      'x-rapidapi-host': NEWS_API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    console.log('API called');
    if (!response.ok) throw new Error(`API request failed`);

    const result = await response.json();
    if (result.success && result.data.length) {
      const redisClient = await getRedisClient();
      // use 30 minutes as cache expiry
      const cacheExpiry = 60 * 30;

      await redisClient.setEx(
        'latestNews',
        cacheExpiry,
        JSON.stringify(result.data)
      );
      await storeCacheNewsToDb(result.data);

      return result.data;
    } else {
      throw new Error('No data in API response');
    }
  } catch (error) {
    console.error('Error fetching news data:', error);
    return null;
  }
};

const storeCacheNewsToDb = async (data) => {
  try {
    await connectDB();
    await News.findOneAndUpdate(
      {},
      {
        data,
        fetchedAt: new Date(),
      },
      { upsert: true }
    );
  } catch (error) {
    console.error('Failed to store news data in MongoDB:', error);
  }
};

export const fetchLatestNews = async () => {
  try {
    const redisClient = await getRedisClient();
    const cachedNews = await redisClient.get('latestNews');
    // 1. Check if Redis cache has data
    if (cachedNews) {
      return JSON.parse(cachedNews);
    }

    // 2. If Redis cache expired, attempt to fetch from API
    const apiNews = await fetchNews();
    if (apiNews) {
      return apiNews;
    }

    // 3. If API fails, fallback to MongoDB data
    await connectDB();
    const mongoNews = await News.findOne();
    return mongoNews ? mongoNews.data : null;
  } catch (error) {
    console.error('Error retrieving news data from cache or database:', error);
    return null;
  }
};
