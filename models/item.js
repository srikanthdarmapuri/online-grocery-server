var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title : { type: String, required: true},
    notes : { type: String},
    purchased : {type: Boolean, default : false}
},
{
    timestamps : true
});

module.exports = mongoose.model('Item', ItemSchema);