const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const products = require('../../models/products');
router.get('/admin/edit-product/:id', (req, res) => {
    products.findById(req.params.id, (error, product) => {
        if(error){
            console.log(ERROR(`cant send the product to edit`));
        }else{
            res.render('admin_edit_product', {
                product: product
            });
        }
    });
});


router.post('/admin/edit-product/:id', (req, res) => {
    let product_update = {};
    product_update.title = req.body.title;
    product_update.price = req.body.price;
    product_update.description = req.body.description;

    let query = {_id: req.params.id};
    products.update(query, product_update, error => {
        if(error){
            console.log(ERROR(`cant update the edited post | ${error}`));
        }else{
            console.log(SUCCESS(`post updated`));
            res.redirect(`/admin/all-products`);
        }
    });
});

module.exports = router;