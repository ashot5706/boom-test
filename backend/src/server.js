const express = require('express');
var morgan = require('./config/morgan');

const path = require('path');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const xss = require('xss-clean');
const compression = require('compression');
const { errorConverter, errorHandler } = require('./middlewares/error');
const i18n = require('./config/i18n.config');
const db = require('./models');

const v1Router = require('./routes/v1');

const app = express();

dotenv.config({
  path: path.resolve(process.cwd(), `config.${process.env.NODE_ENV}.env`),
});

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
// parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Cookie parser
app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());

// Compress all routes

app.use(compression());

// Internationalization
app.use(i18n);

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use(
  cors({
    origin: '*', // Allow all origins
    credentials: false, // Must be false when origin is '*'
  })
);

// Routes
app.use('/api/v1', v1Router);

// Convert error to ApiError, if needed
app.use(errorConverter);

// Error handler, send stacktrace only during development
app.use(errorHandler);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist',
    code: 404,
  });
});

db.sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
