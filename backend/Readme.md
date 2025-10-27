# Node.js PostgreSQL Starter: Express-Powered Boilerplate

Express-Node-Postgres: A ready-to-use Node.js boilerplate with Express and PostgreSQL. Speed up web development with pre-configured linting, routing, and database management

## Manual Installation

Clone the repo:

```bash
git clone  https://github.com/abbaslanbay/nodejs-boilerplate-postgresql.git
cd nodejs-boilerplate-postgresql
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp config.DEVELOPMENT.env.example config.DEVELOPMENT.env

# open config.DEVELOPMENT.env and modify the environment variables (if needed)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Logging](#logging)
- [Linting](#linting)
- [Contributing](#contributing)

## Features

- **SQL database**: [PostgreSQL](https://www.postgresql.org)
- **Boom Real Estate Integration**: API service for house search functionality
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Dependency management**: with [Yarn](https://yarnpkg.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)

- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Multi Language**: with [i18n](https://www.i18next.com/)

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
cp config.DEVELOPMENT.env.example config.PRODUCTION.env
npm run start
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash

JWT_SECRET=123456789asdasasddsa
JWT_ACCESS_EXPIRATION_MINUTES=1000000
JWT_REFRESH_EXPIRATION_DAYS=100
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10

#swagger
DOMAIN=http://localhost:8080
# Port number
PORT=8080

#localhost
DB_HOST=localhost
DB_USER=postgres
DB_PORT=5432
DB_PASSWORD=123456
DB_DATABASE=nodejs-boilerplate

# Boom Real Estate API Configuration
BOOM_CLIENT_ID=your_boom_client_id_here
BOOM_CLIENT_SECRET=your_boom_client_secret_here
BOOM_API_BASE_URL=https://app.boomnow.com/open_api/v1
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--helper\         # Encrypt and auth helper
 |--locales\        # Multi Language using i18n
 |--middlewares\    # Custom express middlewares
 |--models\         # Sequelize models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--server.js          # Express app
```

## API Documentation

Explore the full range of available APIs and their specifications with ease. Simply start the server and navigate to http://localhost:8000/api/v1/docs in your browser. This will take you to a comprehensive documentation page that's generated automatically using the [swagger](https://swagger.io/) definitions. These definitions are conveniently written as comments within the route files. This setup ensures that as our API evolves, so does our documentation.

### API Endpoints

List of available routes:

**Search routes**:\
`GET /api/v1/search?city={cityName}` - Search for houses in a specific city

## Error Handling

Our application features a unified error handling system. Controllers are designed to capture errors and route them to the error-handling middleware by invoking next(error). For an even smoother experience, controllers can be wrapped within the catchAsync utility. This convenient wrapper automatically forwards any errors, ensuring efficient error handling.

```javascript
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error('Something wrong happened');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

In development mode, the error response is enhanced with the inclusion of the error stack for more detailed debugging.

This application is equipped with a handy ApiError class. You can couple this class with a response code and a message, then throw it from any point in your application (don't worry, catchAsync will handle it).

For instance, consider a scenario where you're fetching a user from the database but the user doesn't exist. To send a 404 error in such a case, the code would resemble the following:

```javascript
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
};
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const express = require('express');
const validate = require('../../middlewares/validate');
const { searchValidation } = require('../../validations');
const searchController = require('../../controllers/search/search.controller');

const router = express.Router();

router.get('/search', validate(searchValidation.search), searchController.searchHouses);
```

## Boom Real Estate Integration

The application includes integration with Boom Real Estate API for house search functionality. The service automatically handles authentication and token management.

**Configuration**:
- Set `BOOM_CLIENT_ID` and `BOOM_CLIENT_SECRET` in your environment variables
- The service will automatically authenticate and manage access tokens
- Tokens are refreshed automatically when they expire

**Usage**:
The search endpoint accepts a city parameter and returns house search results (currently returns mock data as the search function is not yet fully implemented).

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

When operating in development mode, console displays will include log messages across all severity levels, providing you with thorough real-time information.

In contrast, production mode prioritizes efficiency and relevance. Only `info`, `warn`, and `error` logs are displayed in the console. The responsibility of reading these logs from the console and archiving them into log files falls upon the server or the process manager.
Don't forget: API request details (such as request URL, response code, timestamp, and more) are logged automatically through the use of [morgan](https://github.com/expressjs/morgan).

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## License

[MIT](LICENSE)
