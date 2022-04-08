// express
const express  = require('express');
const session = require('express-session');

// handlebars
const ehandlebars = require('express-handlebars');
const usePath = require('path');

// initialize express server
const app = express();
const PORT = process.env.PORT || 3006;

// set up sequelize
const sqlz = require('./cfg/connection');
const SqlzStore = require('connect-session-sequelize')(session.Store);

// session setup and initialization
const newsession = {
    secret: 'hipyotech keyboard cat',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SqlzStore({
        db: sqlz
    })
};

app.use(session(newsession));

// helpers, handlebars, and set up for the app and initialization
const helper = require('./utils/helpers');
const handlebars = ehandlebars.create({ helper });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(usePath.join(__dirname, 'public')));

// require controllers
app.use(require('./controllers/index'));

sqlz.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});