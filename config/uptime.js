const axios = require('axios');

const setupUptime= () => {
  setInterval(async () => {
    try {
      await axios.get(process.env.HEALTHCHECK_URL);
      console.log('Uptime check passed.');
    } catch (error) {
      console.error('Uptime check failed:', error.message);
    }
  }, 60000);
};

module.exports = { setupUptime };
