const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/' + process.env.DATABASE_SUBJECT;

module.exports = mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(() => {
    console.log(`Database is ready to ${process.env.DATABASE_SUBJECT}!`);
}).catch((err) => {
    console.log(err);
});