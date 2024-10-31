import { createClient } from 'redis';

let redisClient;

const getRedisClient = async () => {
  if (!redisClient) {
    redisClient = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });

    redisClient.on('connect', () => console.log('Connected to Redis'));
    redisClient.on('ready', () => console.log('Redis Client is ready'));
    redisClient.on('error', (err) =>
      console.error('Redis Client Error:', err.message)
    );
    redisClient.on('end', () => console.log('Disconnected from Redis'));

    try {
      await redisClient.connect();
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      redisClient = null; // Reset client on failure
    }
  }

  return redisClient;
};

// Close Redis client on application termination
const closeRedisClient = async () => {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null; // Reset client reference
  }
};

process.on('SIGINT', closeRedisClient);
process.on('SIGTERM', closeRedisClient); // Handle SIGTERM for graceful shutdown

export default getRedisClient;
