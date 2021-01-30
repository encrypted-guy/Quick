const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const async = require('async');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const products = require('../../models/products');
const contacts = require('../../models/contact');

router.get('/product/:id', (req, res) => {
    let local = {};
    async.parallel([
        each_Product => {
            products.findById(req.params.id , (error, product) => {
                if(error){
                    console.log(ERROR(`cant send the each product | ${error}`));
                }else{
                    local.each_Product = product;
                }
                each_Product();
            });
        },Random_product => {
            products.countDocuments({}, (error, count) => {
                var random  = Math.floor(Math.random() * count/2);
                var doc = products.find({}).skip(random).limit(4);
                doc.find({}, (error, product) => {
                    if(error){
                        console.log('cannoct send the all posts to home to post to post');
                    }else{
                        local.random_products = product;
                        Random_product();
                    }
                });
                
            });
        }
    ], error => {
        if(error){
            console.log(ERROR(`error on each async function`));
        }else{
            res.render('product', {
                each_Product: local.each_Product,
                random_products: local.random_products
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