const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const products = require('../../models/products');
const oders = require('../../models/oders');
/*
router.get('/admin/all-oders', (req, res) => {
    let localoders = {};
    oders.find({}, (error, Oders) => {
        if(error){
            console.log(ERROR(`cant get the all oders ARRAY | ${error}`));
        }else{
            Oders.forEach(oder => {
                console.log(oder.oders_id);  
                products.find({'_id': {$in: oder.oders_id}}, (error, odered_products) => {
                    if(error){
                        console.log(ERROR(`check the odered produts | ${error}`));
                    }else{
                        // console.log(odered_products);
                        // console.log(ERROR(oder.name));
                        localoders.oderx = Oders;
                        localoders.oderx.productx = odered_products;
                        res.render('admin_all_oders', {
                            // name: oder.name,
                            // address: oder.address,
                            // Zip: oder.Zip,
                            // email: oder.email,
                            // phone: oder.phone,
                            // totalPrice: oder.totalPrice,

                            // Oder: Oders,
                            // odered_products: odered_products
                            mainOders: localoders,
                            Oders: localoders.oderx,
                            odered_products: localoders.oderx.productx
                        });
                        
                        console.log(ERROR(Oders))
                        console.log(SUCCESS(odered_products))
                    }
                });
            });
        }
    });
});
*/

router.get('/admin/all-oders', (req, res) => {
    oders.find({}, (error, odered) => {
        if(error){
            console.log(ERROR(`cant send the odered products | ${error}`))
        }else{
            console.log(odered)
            res.render('admin_all_oders', {
                odered: odered
            });
        }
    });

});
module.exports = router;