const router = require('express').Router();
const sequelize = require('../config/connection');
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
              'is_paid',
              'date_paid'
          ],    
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
    })
    .then(dbExpenseData => {
        const expenses = dbExpenseData.map(expense => expense.get({ plain: true })).filter(e => e.is_paid === "1");
        const paidExpenses = dbExpenseData.map(expense => expense.get({ plain: true })).filter(e => e.is_paid === "2");
        var totalDue = calculateTotalDue(expenses);
        var totalPaid = calculateTotalPaid(paidExpenses);
        res.render('dashboard', { expenses, totalDue, paidExpenses, totalPaid, success: true, errors: [], loggedIn: true });
        req.session.errors = null;
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

function calculateTotalDue(expenses) {
  let runningTotal = 0;
  for (let i = 0; i < expenses.length; i++){
      runningTotal += Number(expenses[i].expense_value);
  };

  return runningTotal.toFixed(2);
};

function calculateTotalPaid(expenses) {
  let runningTotal = 0;
  for (let i = 0; i < expenses.length; i++){
      runningTotal += Number(expenses[i].expense_value);
  };

  return runningTotal.toFixed(2);
};

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