// imports
const { Usermodel, Postmodel } = require('../models');

const userSeedData = [
    {
        username: 'test1',
        email: 'test1@gmail.com',
        password: 'test123'
    },
    {
        username: 'test2',
        email: 'test2@gmail.com',
        password: 'test123'
    },
    {
        username: 'test3',
        email: 'test3@gmail.com',
        password: 'test123'
    }
];

const seedMyUsers = () => Usermodel.bulkCreate(userSeedData, {individualHooks: true});
module.exports = seedMyUsers;
