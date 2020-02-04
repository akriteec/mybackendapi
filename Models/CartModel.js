var mongoose = require('mongoose');

var cartScheme = new mongoose.Schema({
    
    pid: {
        type: String,
    },
    pname: {
        type: String,
        required:true
    },
    pprice: {
        type: String,
        required:true
        
    },
     pquantity: {
        type: String,
        required:true
        
    }
});

module.exports = mongoose.model('cart', cartScheme);