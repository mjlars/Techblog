// get routes for all the users, posts, and comments

const router = require('express').Router();
const userRoute = require('./userRoute.js');
const postRoute = require('./postRoute.js');
const commentRoute = require('./commentRoute.js');

router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);

module.exports = router;