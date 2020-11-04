const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');

const path = require('path');

/* Add the following lines of code to set up Handlebars.js as your app's template engine of choice: */
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*The express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets. 
This is useful for front-end specific files like images, style sheets, and JavaScript files. */
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});