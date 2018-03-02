var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    cardNumber: {type: Number, required: true},
    amountRecharged: {type: Number, required: true}
});

module.exports = mongoose.model('Card', cardSchema);
