// ../config/redis.js
const Redis = require('ioredis');

const redisClient = new Redis({
  host: '127.0.0.1', // Connects to Redis running locally
  port: 6379, // Redis default port
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

module.exports = redisClient;
