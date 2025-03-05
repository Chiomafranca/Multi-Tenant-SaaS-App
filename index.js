require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { setupSwagger } = require('./config/swagger');
const winston = require('./config/logger');
const { setupDatabaseMigrations } = require('./config/migrations');
const { applyRateLimiting } = require('./middlewares/rateLimiter');
const { auditLogger } = require('./middlewares/auditLogger');
const { initGraphQL } = require('./config/graphql');
const { setupBullMQ } = require('./config/bullmq');
const { setupTelemetry } = require('./config/opentelemetry');
const { applySecurity } = require('./config/security');
const { setupUptime } = require('./config/uptime');
const { monitorUptime } = require('./services/uptimeService');
const connectDB = require("./config/db");


// Import Routes
const authRoutes = require('./routes/authRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const paymentRoutes = require('./routes/subscriptionRoutes');
const roleRoutes = require('./routes/roleRoutes');

// App Initialization
const app = express();

// Security & Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: winston.stream }));
app.use(auditLogger);

connectDB()

// Initialize Passport (OAuth2, JWT)
passport.initialize();

// Migrations
setupDatabaseMigrations();

// Setup GraphQL
initGraphQL(app);

// Setup Background Jobs
setupBullMQ();

// Setup OpenTelemetry Monitoring
setupTelemetry();

// Start Uptime Monitoring
monitorUptime();

// Apply Security Headers
applySecurity(app);

// Setup Swagger API Docs
setupSwagger(app);


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Apply Rate Limiting Middleware
applyRateLimiting(app);

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  winston.info(`Server running on port ${PORT}`);
});

// Sentry Debug Route
app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});
