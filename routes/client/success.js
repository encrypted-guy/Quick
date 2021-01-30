const express = require('express');
const router = express.Router();

router.get('/success', (req, res) => {
    if(req.session.cart && req.session.cart.length == 0){
        delete req.session.cart;
        res.redirect('/success');
    }else{
        res.render('success', {
            cart: req.session.cart
        });
    }
});

router.get('/success-check', (req, res) => {
    delete req.session.cart;
    res.redirect('/success');
    console.log(`all item cleared`);
});

module.exports = router;