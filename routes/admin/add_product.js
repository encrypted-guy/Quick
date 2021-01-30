const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const products = require('../../models/products');

router.get('/admin/add-products', (req, res) => {
    res.render('admin_add_product');
});

const upload = require('../../config/image');
router.post('/added', upload.single('file'), (req, res) => {
    const filename = req.file.filename;
    const imgurl = `/image/${req.file.filename}`;
    const contentType = req.file.contentType;
    const file_id = req.file.id;
    const title = req.body.title;
    const price_value = req.body.price;
    const price = parseFloat(price_value).toFixed(2);
    const description = req.body.description;

    let new_product = new products({
        title: title,
        price: price,
        description: description,
        filename: filename,
        imgurl: imgurl,
        contentType: contentType,
        file_id: file_id
    });
    new_product.save(error => {
        if(error){
            console.log(ERROR(`cant save the product`));
        }else {
            console.log(SUCCESS(`product saved`));
            res.redirect('/admin/add-products');
        }
    });
});

module.exports = router;