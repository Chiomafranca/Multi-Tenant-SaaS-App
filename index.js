require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const { setupSwagger } = require("./config/swagger");
const logger = require("./config/logger");
const { setupDatabaseMigrations } = require("./config/migrations");
const { applyRateLimiting } = require("./middlewares/rateLimiter");
const { initGraphQL } = require("./config/graphql");
const { setupTelemetry } = require("./config/opentelemetry");
const { applySecurity } = require("./config/security");
const { setupUptime } = require("./config/uptime");
const { monitorUptime } = require("./services/uptimeService");
const connectDB = require("./config/db");


// Routes
const authRoutes = require("./routes/authRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
// const paymentRoutes = require("./routes/");
const roleRoutes = require("./routes/roleRoutes");
const auditLoggerRoutes = require("./routes/AuditLogRoutes");
const apiKeyRoutes = require("./routes/ApikeyRoutes");
const activityLogRoutes = require('./routes/ActivityLogRoutes');
const billingandPaymentRoutes = require('./routes/BillingandPaymentRoutes');
const featureToggleControllerRoutes = require('./routes/FeatureToggleRoutes');
const notificationRoutes = require("./routes/NotificationRoutes");
const permissionRoutes = require("./routes/PermissionRoutes");
const securityRoutes = require('./routes/SecurityRoutes');
const settingRoutes = require('./routes/SettingsRoutes');
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const supportRoutes = require('./routes/SupportTicketRoutes')



// Cookie parsing middleware
const cookieParser = require("cookie-parser");

// App Initialization
const app = express();

// Core Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // ✅ Added cookie-parser
app.use(
  morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } })
);

// Security & Monitoring
connectDB();
passport.initialize();
setupDatabaseMigrations();
initGraphQL(app);
setupTelemetry();
monitorUptime();
applySecurity(app);
setupSwagger(app);
applyRateLimiting(app); // ✅ Apply before routes

// Routes
app.use("/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);
// app.use("/api/payments", paymentRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/audit", auditLoggerRoutes); 
app.use("/api/apikey", apiKeyRoutes);
app.use("/api/activity", activityLogRoutes);
app.use('/api/billing', billingandPaymentRoutes);
app.use('/api/toggle', featureToggleControllerRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/permission', permissionRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/subcription', subscriptionRoutes);
app.use('/api/support', supportRoutes)


// Misc Routes
app.get("/healthcheck", (req, res) => res.status(200).send("OK"));
app.get("/debug-sentry", () => {
  throw new Error("My first Sentry error!");
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
