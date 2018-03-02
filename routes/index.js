var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('zone/index', { title: 'Stark Tech' });
});

module.exports = router;
