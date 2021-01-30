const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const products = require('../../models/products');
router.get('/admin/all-products', (req, res) => {
    products.find({}, (error, products) => {
        if(error){
            console.log(ERROR(`Cant send all products to admin`));
        }else{
            res.render('admin_all_products', {
                products: products
            });
        }
    });
    
});

module.exports = router;