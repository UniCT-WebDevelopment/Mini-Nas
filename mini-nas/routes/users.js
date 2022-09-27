const express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.user){return res.render('user_dash');}
  else {return res.redirect('/')}
  });

module.exports =router;