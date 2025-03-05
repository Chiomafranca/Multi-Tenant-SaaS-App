// Uptime Monitoring Service (uptimeService.js)
const axios = require('axios');
const winston = require('winston')

exports.monitorUptime = () => {
  setInterval(async () => {
    try {
      await axios.get(process.env.HEALTHCHECK_URL);
      winston.info('Uptime check passed.');
    } catch (error) {
      winston.error('Uptime check failed:', error.message);
    }
  }, 60000);
};