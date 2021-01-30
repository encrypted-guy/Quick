const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const chalk = require('chalk');
const dotenv = require('dotenv');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;
dotenv.config({ path: './config/config.env' });
//DB
require('./config/db');

// middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set('json spaces', 3);
app.use('/public',express.static('public'));

// express session
app.use(session({
    secret: process.env.SECRECT,
    resave: false,
    saveUninitialized: true
}));

// global varible
app.get('*', (req, res, next) => {
    res.locals.cart = req.session.cart;
    next();
});



//routes

// CLIENT
app.use('/', require('./routes/client/home')); // Home
app.use('/', require('./routes/client/products')); // All products
app.use('/', require('./routes/client/eachProduct')); // All products
app.use('/', require('./routes/client/success')); // success page


//ADMIN
app.use('/', require('./routes/Admin/main')); // main admin
app.use('/', require('./routes/Admin/all_products'));  // all products
app.use('/', require('./routes/Admin/add_product'));  // add products
app.use('/', require('./routes/Admin/edit_product'));// edit products
app.use('/', require('./routes/Admin/all_emails')); // ALL Emails
app.use('/', require('./routes/Admin/all_oders')); // ALL Orders
app.use('/', require('./routes/Admin/delete_products')); // ALL Orders

app.use('/', require('./routes/images')); // IMAGES
app.use('/', require('./routes/cart')); // cart



app.listen(process.env.PORT, () => {
    console.log(SUCCESS(` server running on port ${process.env.PORT} `));
})