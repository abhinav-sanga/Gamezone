var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    cardNumber: {type: String, required: true},
    amountRecharged: {type: Number, required: true},
    dateOfRech: {type: String, default: function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var mn = today.getMinutes();
        var ss = today.getSeconds();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        if(hh<10) {
            hh = '0'+hh
        }

        if(mn<10) {
            mn = '0'+mn
        }

        if(ss<10) {
            ss = '0'+ss
        }

        today = mm + '/' + dd + '/' + yyyy + ' ' + hh + ':' + mn + ':' + ss;

        return today;
    }
}});

module.exports = mongoose.model('Card', cardSchema);
