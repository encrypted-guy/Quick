const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let contact_info = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});
let contacts = mongoose.model('contacts', contact_info);
module.exports = contacts;