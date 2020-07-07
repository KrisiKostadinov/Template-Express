const express = require('express');
const exphbs = require('express-handlebars');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const config = require('dotenv').config();
const db = require('./config/db');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mls = require('./config/mls');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded());

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

const { NAME_SESSION, SECRET_SESSION, EXPIRE_SESSION } = process.env;

app.use(session({
    name: NAME_SESSION,
    secret: SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        sameSite: true,
        maxAge: Number(EXPIRE_SESSION),
    }
}));

app.set('view engine', '.hbs');
app.use("/public", express.static(__dirname + '/public'));

app.use(mls.setUserData);

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(process.env.PORT, () => console.log('Server listening on port: ' + 2000));