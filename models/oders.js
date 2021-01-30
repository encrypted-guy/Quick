const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let oders_info = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    Zip: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    odered_items: []
});
let oders = mongoose.model('oders', oders_info);
module.exports = oders;