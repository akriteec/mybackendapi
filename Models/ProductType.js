

var mongoose = require('mongoose');

var ProductTypeSchema = new mongoose.Schema({
 productType:{
        type:String,
        require: true
    }
    // },
    //  imagePT:{
    //     type:String,
    //     require: true
    // }
});

module.exports = mongoose.model('productType', ProductTypeSchema);