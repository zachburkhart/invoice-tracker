const router = require('express').Router();
//const sequelize = require('../config/connection');
const { Expense, User } = require('../models');
const authorization = require('../utils/auth');



router.get('/', authorization, (req,res)=>{
    Expense.findAll({
        where: {
            user_id: req.session.user_id
          },
          attributes: [
              'id',
              'title',
              'description',
              'expense_value',
              'date_due',
          ],    
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        })
        .then(dbExpenseData => {
            const expenses = dbExpenseData.map(expense => expense.get({ plain: true }));
            res.render('dashboard', { expenses, loggedIn: true });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });

      router.get('/edit/:id', authorization, (req, res) => {
        Expense.findByPk(req.params.id, {
          attributes: [
            'id',
            'title',
            'description',
            'expense_value',
            'date_due',
        ],    
    })
        .then(dbExpenseData => {
            const expenses = dbExpenseData.map(expense => expense.get({ plain: true }));
            res.render('edit-expense', { expenses, loggedIn: true });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });
      


module.exports = router;