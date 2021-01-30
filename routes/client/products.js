const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const products = require('../../models/products');
router.get('/products', (req, res) => {
    products.find({}, (error, product) => {
        if(error){
            console.log(ERROR(`cant send the all products`))
        }else{
            res.render('products', {
                product
            })
        }
    });
});

module.exports = router;