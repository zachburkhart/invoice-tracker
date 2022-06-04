const router = require('express').Router();
const { Expense, User } = require('../../models');
const { body, validationResult } = require('express-validator');
const authorization = require('../../utils/auth');
const dayjs = require('dayjs');



router.get('/', (req, res) => {
    Expense.findAll({
        where:{
            user_id: req.session.user_id
            },
        order:[['date_due', 'DESC']],
        attributes:[
            'id',
            'title',
            'description',
            'expense_value',
            'date_due',
            'is_paid'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(expenseData => {
        res.json(expenseData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })  
})

router.get('/:id', authorization, (req, res) => {
    Expense.findOne({
        where: {
            id: req.params.id
        },
        attributes:[
            'id',
            'title',
            'description',
            'expense_value',
            'date_due'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ],
    })
    .then(dbExpenseData => {
        if(!dbExpenseData) {
            res.status(404).json({ message: 'No expense found with this id' });
            return;
        }
        res.json(dbExpenseData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Expense.update(
      {
        is_paid: req.body.is_paid,
        date_paid: req.body.date_paid
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No expense found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.delete('/:id', authorization, (req, res) => {
    Expense.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbExpenseData => {
        res.json(dbExpenseData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.post('/', 

    body('title', 'Please enter a valid title').isLength({min: 1}),
    body('description', 'Please enter description').isLength({min: 1}),
    body('expense_value', 'Please enter a valid expense').isCurrency(),
    body('date_due', 'Please enter a valid date').custom((value, { req }) => {
        if (dayjs(value, "MM/DD/YYYY", true).isValid()) {
          return true;
        }
        return false;
      }),

(req, res) => {

    var errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Expense.create({
        title:req.body.title,
        description:req.body.description,
        expense_value:req.body.expense_value,
        date_due:req.body.date_due,
        user_id: req.session.user_id,
        is_paid: 1
    })
    .then(expenseData => {
        res.json(expenseData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})



module.exports = router;