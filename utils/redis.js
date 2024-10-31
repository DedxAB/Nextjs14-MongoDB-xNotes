import { createClient } from 'redis';

let redisClient;
let isConnected = false; // To track connection status

const getRedisClient = async () => {
  // Check if the client already exists and is connected
  if (!redisClient) {
    console.log('Creating new Redis client');

    redisClient = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });

    // Handle errors
    redisClient.on('error', (err) => console.error('Redis Client Error:', err));

    // Connect client if not already connected
    try {
      await redisClient.connect();
      isConnected = true; // Mark as connected
      console.log('Redis client connected');
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      redisClient = null; // Reset client instance on failure
    }
  } else if (!isConnected) {
    // If client exists but is not connected, try to reconnect
    try {
      await redisClient.connect();
      isConnected = true; // Mark as connected
      console.log('Reconnected to Redis client');
    } catch (error) {
      console.error('Failed to reconnect to Redis:', error);
    }
  } else {
    console.log('Reusing existing Redis client');
  }

  return redisClient;
};

export default getRedisClient;
