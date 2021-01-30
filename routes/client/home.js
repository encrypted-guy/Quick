const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const async = require('async');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const products = require('../../models/products');
const contacts = require('../../models/contact');

router.get('/', (req, res) => {
    let local = {};
    async.parallel([
        trending_Product => {
            let featuted_id = '5ebb077db3c32820502aff4e';
            products.findById(featuted_id, (error, product) => {
                if(error){
                    console.log(ERROR(`cant send the trending product | ${error}`));
                }else{
                    local.trending = product;
                }
                trending_Product();
            });
        },product_list_home => {
            products.find({}, (error, products) => {
                if(error){
                    console.log(ERROR(`cant send the all product to home`));
                }else{
                    local.all_products = products;
                    product_list_home();
                }
            });
        }
    ], error => {
        if(error){
            console.log(ERROR(`error on each async function`));
        }else{
            res.render('index', {
                trending: local.trending,
                products: local.all_products
            });
        }
    });
});

router.post('/message', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;

    let new_contact = new contacts({
        name: name,
        email: email,
        message: message
    });
    new_contact.save(error => {
        if(error){
            console.log(ERROR(`cant save the contact info | ${error}`));
        }else{
            res.redirect('/#contact');
            console.log(SUCCESS(`contact infomation saved`));
        }
    });

});

module.exports = router;