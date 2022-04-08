// require express-router
const router = require('express').Router();

// require routes for the app
const routes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashRoutes = require('./dashRoutes.js');

// use routes that we setup
router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);
router.use('/api', routes);

// export router
module.exports = router;