const router = require('express').Router();
const { Expense, User } = require('../../models');
const authorization = require('../../utils/auth');

router.get('/', (req, res) => {
    Expense.findAll({
        where:{
            user_id: req.session.user_id
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
        order:[['date_due', 'DESC']]
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

router.delete('/:id', authorization, (req, res) => {
    Expense.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbExpenseData => {
        if(!dbExpenseData) {
            res.status(404).json({ message: 'No expense with this ID!' });
            return;
        }
        res.json(dbExpenseData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.post('/', (req, res) => {
    Expense.create({
        title:req.body.title,
        description:req.body.description,
        expense_value:req.body.expense_value,
        date_due:req.body.date_due,
        user_id: req.session.user_id
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