const express = require('express');
const exphbs = require('express-handlebars');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const config = require('dotenv').config();
const db = require('./config/db');
const session = require('express-session');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');

require('./config/passport')(passport);

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(methodOverride('_method'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash());

app.use((req, res, next) => {
    res.locals.error_msg = req.flash('error_msg');
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    next();
});

app.set('view engine', '.hbs');
app.use("/public", express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(process.env.PORT, () => console.log('Server listening on port: ' + 2000));