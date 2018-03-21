var express = require('express');
var router = express.Router();
var Card = require('../models/card');

router.post('/rech', function(req,res,next){
    var newCard = new Card();
    newCard.user = req.user;
    newCard.cardNumber = req.body.cardnum;
    newCard.amountRecharged = req.body.amountRech;
    req.checkBody('cardNumber','Invalid card number').isLength({min:10});
    req.checkBody('amountRecharged','Recharge is not complimentary :P').notEmpty();
    var errors = req.validationErrors();
    console.log(errors);
    newCard.save(function (err, card) {
        if(err){
            if(errors) {
                var messages = [];
                errors.forEach(function (error) {
                    messages.push(error.msg);
                });
                req.flash('error', messages);
                res.render('user/profile', {messages: messages, hasErrors: messages.length > 0});
            }
        }
        else {
            req.flash('notice', 'Successfully Recharged!');
            res.render('user/profile', {flash: {notice: req.flash('notice')}});
        }});
});

/*router.put('/rech/:id', function (req, res) {
        Card.findOneAndUpdate({
            _id: req.params.id
        },
        {$set:{ amountRemain}})
}); */

module.exports = router;
