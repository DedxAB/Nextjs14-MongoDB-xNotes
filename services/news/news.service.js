import connectDB from '@/db/mongodb';
import News from '@/models/news.model';
import { NEWS_API_HOST, NEWS_API_KEY, NEWS_URL } from '@/utils/constants';
import getRedisClient from '@/utils/redis';
import dayjs from 'dayjs';

export const fetchNews = async () => {
  const baseUrl = `${NEWS_URL}?country=in&language=en&topic=technology`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': NEWS_API_KEY,
      'x-rapidapi-host': NEWS_API_HOST,
    },
    cache: 'no-store',
  };

  const fetchData = async (url) => {
    try {
      const response = await fetch(url, options);
      console.log('API called');
      if (!response.ok) throw new Error(`API request failed`);

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching news data:', error.message);
      return null;
    }
  };

  let result = await fetchData(baseUrl);

  if (!result || !result.success || !result.data.length) {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const newUrl = `${baseUrl}&date=${currentDate}`;
    result = await fetchData(newUrl);
  }

  if (result && result.success && result.data.length) {
    const redisClient = await getRedisClient();
    const cacheExpiry = 60 * 30; // 30 minutes

    await redisClient.setEx(
      'latestNews',
      cacheExpiry,
      JSON.stringify(result.data)
    );
    await storeCacheNewsToDb(result.data);
    console.log('News data stored in cache and MongoDB');

    return result.data;
  } else {
    console.error('No data in API response');
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
      // console.log('News data fetched from API', apiNews);
      return apiNews;
    }

    // 3. If API fails, fallback to MongoDB data
    await connectDB();
    console.log('Fetching news data from MongoDB');
    const mongoNews = await News.findOne();
    // console.log('News data fetched from MongoDB:', mongoNews);

    return mongoNews ? mongoNews.data : null;
  } catch (error) {
    console.error('Error retrieving news data from cache or database:', error);
    return null;
  }
};
