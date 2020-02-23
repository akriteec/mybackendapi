var mongoose = require('mongoose');

var cartScheme = new mongoose.Schema({
    
    
    pprice: {
        type: String,
        required:true
        
    },
     pname: {
        type: String,
        required:true
    },
     pdescription: {
        type: String,
        required:true,
        
    },
    pemail:{
        type:String,
        required:true,
    },
    pphone:{
        type:String,  
        required:true
    }
});

module.exports = mongoose.model('cart', cartScheme);