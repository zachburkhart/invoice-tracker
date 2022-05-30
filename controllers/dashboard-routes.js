const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Expense } = require('../models');
const authorization = require('../utils/auth');

module.exports = router;