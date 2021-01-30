const mongoose = require('mongoose');
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;


const URL = process.env.MONGO_URL;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(URL);
const conn = mongoose.connection;
conn.on('error', error => {
    console.log(ERROR(' error connecting database | '+ error ));
});
conn.once('open', () => {
    console.log(SUCCESS(' DB connection successfull '));
});
