const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const products = require('../../models/products');

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

router.get('/admin/delete-product/:id', (req, res) => {
    products.findById(req.params.id, (error, product) => {
        if(error){
            console.log(ERROR(`cant get the Product to delete`));
        }else{
            // const _id = post._id;
            const file_id = product.file_id;
            product.remove(error => {
                if(error){
                    console.log(ERROR(`cant delete the fruits | ${error}`));
                }else{
                    gfs.remove({_id: file_id, root: 'uploads'}, (error, gridStore) => {
                        if(error){
                            return res.status(404).json({err: err});
                        }
                        console.log(SUCCESS(`product deleted`));
                        res.redirect('/admin/all-products');
                    });
                }
            });

        }
    });
});

module.exports = router;