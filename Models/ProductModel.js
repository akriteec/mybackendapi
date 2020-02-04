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
    popularproduct:{
        type: String,
       
    },
     dailyessentials:{
        type: String,
       
    },
     vegetables:{
        type: String,
       
    },
     fruits:{
        type: String,
       
    },
     cookingoil:{
        type: String,
       
    },
   
});

module.exports = mongoose.model('product', productSchema);