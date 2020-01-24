var mongoose = require('mongoose');

var contactusSchema = new mongoose.Schema({
    yourname: {
        type: String,
        required: true
    },
    youremail: {
        type: String,
        required:true
    },
    yourfeedback: {
        type: String,
        
    }
});

module.exports = mongoose.model('contactus', contactusSchema);