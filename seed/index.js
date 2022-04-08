// pull the seeds for users and posts
const seedMyUsers = require('./userSeed');
const seedMyPosts = require('./postSeed');

// add sequelize
const sqlz = require('../cfg/connection');

const seedMyShit = async () => {
    await sqlz.sync({ force: true });
        console.log('synced sequelize');

        await seedMyUsers();
            console.log('seeded users');

        await seedMyPosts();
            console.log('seeded posts');

        process.exit(0);      
};

seedMyShit();