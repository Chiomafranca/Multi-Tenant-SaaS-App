const { Queue } = require('bullmq');
const redisClient = require('../config/redis'); 

const emailQueue = new Queue('emailQueue', { connection: redisClient });

const setupBullMQ = () => {
  console.log('BullMQ initialized');
};

module.exports = { setupBullMQ, emailQueue };
