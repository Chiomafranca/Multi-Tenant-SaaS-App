// Email Service (emailService.js)
const emailService = {
    sendEmail: async (to, subject, text) => {
      console.log(`Email sent to ${to}: ${subject}`);
    },
  };
  module.exports = emailService;
  