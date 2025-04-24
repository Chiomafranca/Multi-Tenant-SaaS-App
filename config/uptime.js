const axios = require('axios');
const logger = require('../config/logger');
const dotenv = require('dotenv');

dotenv.config();

const setupUptime = () => {
  setInterval(async () => {
  
    try {
      await axios.get(process.env.HEALTHCHECK_URL);
      logger.info('Uptime check passed.');
    } catch (error) {
      logger.error(`Uptime check failed: ${error.message}`);
    }
  }, 60000);
};

module.exports = { setupUptime };

