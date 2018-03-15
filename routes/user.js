var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');
var Card = require('../models/card');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, ifAdmin, ifOwner, function(req,res,next){
    res.render('user/profile');
});

router.get('/collections', isLoggedIn, function (req, res, next) {
    console.log('Getting all collections..');
    var fromDate = req.query.fromdate;
    var actualtoDate = req.query.todate;
    var toDate = new Date(actualtoDate);
    toDate.setDate(toDate.getDate()+1);

    /*function checktoDate() {
        if ((parseInt(toDate.slice(8, toDate.length + 1))) < 10) {
            toDate = toDate.slice(0, 8) + '0' + (parseInt(toDate.slice(8, toDate.length + 1)) + 1).toString();
        } else {
            toDate = toDate.slice(0, 8) + (parseInt(toDate.slice(8, toDate.length + 1)) + 1).toString();
        }
        return toDate;
    }*/
    console.log(fromDate, toDate);
    if(req.user.isAdmin){
        Card.find({
            createdAt: {
                $gte: fromDate,
                $lt: toDate
            }
        }, function (err, docs) {
            if(err){
                //res.redirect('/user/profile');
                res.send(err);
            } else {
                console.log(docs);
            }
        });
    } else {
        res.redirect('/user/profile');
    }

});


router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});


/* GET users listing. */
router.get('/signup', function(req,res,next){
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/signin', function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});


router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));


module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function ifAdmin(req,res,next) {
    if(req.user.isAdmin === true){
        return res.render('user/adminprofile');
    }
    next();
}

function ifOwner(req, res, next){
    if(req.user.isOwner === true){
        return res.render('user/ownerprofile');
    }
    next();
}