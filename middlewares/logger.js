const logger = require('../config/logger');  


const logRequests = (req, res, next) => {
    const start = Date.now(); 
    console.log(req.body) 

    logger.info(`${req.method} ${req.url}`);  

    res.on('finish', () => {  
        const duration = Date.now() - start;  
        logger.info(`Response status: ${res.statusCode} | Duration: ${duration}ms`);  
    });

    next(); 
};

module.exports = { logRequests };
