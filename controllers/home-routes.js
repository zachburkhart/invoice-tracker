const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Expense  } = require('../models');

router.get('/', (req, res ,) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

  router.get('/login', (req, res ,) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });







  module.exports = router;