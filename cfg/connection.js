// require sequelize
const Sql = require('sequelize');
// require env
require('dotenv').config();

// create sequelize instance
let sqlz;
if (process.env.JAWSDB_URL) {
    sqlz = new Sql(process.env.JAWSDB_URL);
    } else {
        sqlz = new Sql(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: '127.0.0.1',
                dialect: 'mysql',
                port: 3306
            }
        );
    }

module.exports = sqlz;