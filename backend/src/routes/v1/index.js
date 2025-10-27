const express = require('express');

const router = express.Router();

const docsRoute = require('./docs.route');
const searchRoute = require('./search.route');

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

const apiRoutes = [
  {
    path: '/search',
    route: searchRoute,
  },
];

apiRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
