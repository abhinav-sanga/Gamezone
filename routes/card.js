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
        req.flash('Successfully Recharged!', message);
        res.send(card);
    });
});

module.exports = router;
