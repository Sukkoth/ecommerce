const mongoose = require('mongoose');
const db_url = require('./env').db_url;

mongoose.set('strictQuery', false);
const connectToDatabase = () =>
    mongoose
        .connect(db_url, { useNewUrlParser: true })
        .then(() => console.log('DATABASE CONNECTED'))
        .catch((err) => {
            console.log('DB ERROR', err.message);
            process.exit(0);
        });

module.exports = connectToDatabase;
