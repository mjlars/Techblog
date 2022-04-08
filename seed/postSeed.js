// imports
const { Postmodel } = require('../models');

const postSeedData = [
    {
        id: 1,
        title: 'Ryzen CPU Greatness',
        content: 'The Greatness of the Greatness of the Greatness',
        user_id: 1
    },
    {
        id: 2,
        title: 'Intel CPU Greatness',
        content: 'The Greatness of the Greatness of the Greatness',
        user_id: 2
    },
    {
        id: 3,
        title: 'Test Post',
        content: 'This is a test post',
        user_id: 2
    }
];

const seedMyPosts = ()  => Postmodel.bulkCreate(postSeedData);
module.exports = seedMyPosts;
