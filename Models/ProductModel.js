const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    
    imagep: {
        type: String
    },
    productType:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('product', productSchema);