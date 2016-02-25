var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var carModel = new Schema({
    model: {
        type: String
    },
    brand: {type: String},
    year: {type: Date},
    used: {type: Boolean, default: false}
});

// New Schema called "Car"
module.exports = mongoose.model('Car', carModel);