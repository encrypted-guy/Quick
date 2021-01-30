const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;
const products = require('../models/products');

router.get('/add/cart/:id', (req, res) => {
    let id = req.params.id;
    products.findOne({_id: id}, (error, product) => {
        if(error){
            console.log(ERROR(`cant get Product to add cart`));
        }else{
            // if the cart is empty
            if(typeof req.session.cart == 'undefined'){
                req.session.cart = [];
                req.session.cart.push({
                    title: product.title,
                    qty: 1,
                    price: parseFloat(product.price).toFixed(2),
                    imgurl: product.imgurl,
                    id: product._id
                });
            }else{
                let cart = req.session.cart;
                let newitem = true;

                // if item exists add the quantity
                for(let i = 0; i < cart.length; i++){
                    if(cart[i].id == id){
                        cart[i].qty++;
                        newitem = false;
                        break;
                    }
                }

                // if new item add the item
                if(newitem){
                    cart.push({
                        title: product.title,
                        qty: 1,
                        price: parseFloat(product.price).toFixed(2),
                        imgurl: product.imgurl,
                        id: product._id
                    });
                }

            }
        }
        console.log(SUCCESS(`product added TO cart`));
        console.log(req.session.cart);
        res.redirect('back');
    });
});

// cart number
// router.get('/cartvalue', (req, res) => {
//     console.log(req.session.cart.length);
//     let cartvalue = req.session.cart.length;
//     res.json(JSON.stringify(cartvalue));
// });

// cart page
router.get('/cart', (req, res) => {
    if(req.session.cart && req.session.cart.length == 0){
        delete req.session.cart;
        res.redirect('/cart');
    }else{
        res.render('cart', {
            cart: req.session.cart
        });
    }
});

// add and remove
router.get('/cart/update/:id', (req, res) => {
    let id = req.params.id;
    let cart = req.session.cart;
    let action = req.query.action;

    for (let i = 0; i < cart.length; i++) { 
        if(cart[i].id == id){
            switch(action){
                case "add":
                    cart[i].qty++;
                    break;
                case "remove":
                    cart[i].qty--;
                    if(cart[i].qty < 1){
                        cart.splice(i, 1);
                    }
                    break;
                case "clear":
                    cart.splice(i, 1);
                    if(cart.length == 0) {
                        delete req.session.cart;
                    }
                    break;
                default:
                    console.log('cart update problem');
                    break;
            }
            break;
        }
    }
    console.log(`SUCCESS: cart product update success`);
    res.redirect('back');
});

// api
router.get('/end', (req, res )=>{
    let all = req.session.cart;
    res.json(all);
});

// check out
router.get('/checkout', (req, res )=>{
    res.render('checkout', {
        checkoutitems: req.session.cart
    });
});
const oders = require('../models/oders');
router.post('/make-oder', (req, res )=>{
    console.log(req.body);
    let name = req.body.name;
    let address = req.body.address;
    let Zip = req.body.Zip;
    let email = req.body.email;
    let phone = req.body.phone;
    let totalPrice = req.body.totalPrice;
    let odered_items = [];
    let cartitems = req.session.cart;
    cartitems.forEach(oders => {
        odered_items.push({
            odered_id: oders.id,
            odered_img: oders.imgurl,
            odered_title: oders.title
        });
    });
    let new_oder = new oders({
        name: name,
        address: address,
        Zip: Zip,
        email: email,
        totalPrice: totalPrice,
        phone: phone,
        odered_items: odered_items
    });
    new_oder.save(error => {
        if(error){
            console.log(ERROR(`cant save the oder | ${error}`));
        }else{
            console.log(SUCCESS(`oder saved`));
        }
    })
});



module.exports = router;