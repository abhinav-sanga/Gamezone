var express = require('express');
var router = express.Router();
var Card = require('../models/card');

router.post('/rech', function(req,res,next){
    var newCard = new Card();
    newCard.user = req.user;
    newCard.cardNumber = req.body.cardnum;
    newCard.amountRecharged = req.body.amountRech;
    newCard.save(function (err, card) {
        if(err){
            res.send(err);
        }
        req.flash('notice', 'Successfully Recharged!');
        res.render('user/profile', {flash: {notice: req.flash('notice')}});
    });
});

module.exports = router;
