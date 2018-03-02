var express = require('express');
var router = express.Router();
var Card = require('../models/card');

router.post('/rech', function(req,res,next,done){
    var newCard = new Card();
    newCard.user = req.user;
    newCard.cardNumber = req.body.cardnum;
    newCard.amountRecharged = req.body.amountRech;
    //newCard.dateOfRech = req.body.dateOfRech;
    newCard.save(function (err, result) {
        if(err){
            return done(err);
        }
        req.flash('success', 'Successfully Recharged!');
        return done(null, newCard);
    });
});

module.exports = router;
