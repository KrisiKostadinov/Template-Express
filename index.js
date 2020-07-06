const express = require('express');
const exphbs = require('express-handlebars');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.use("/public", express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(2000, () => console.log('Server listening on port: ' + 2000));