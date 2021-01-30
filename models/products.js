const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let product_info = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    imgurl: {
        type: String,
        required: true
    },
    contentType: { 
        type: String,
        required: true
    },
    file_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "uploads.files"
    }
});
let products = mongoose.model('posts', product_info);
module.exports = products;