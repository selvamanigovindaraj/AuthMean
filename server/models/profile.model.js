var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    school:{type: String, required: true}
});
module.exports = mongoose.model('Student', userSchema);