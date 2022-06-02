const router = require('express').Router();
//const { User, Expense } = require('../models');
//const authorization = require('../utils/auth');

router.get('/', (req,res) => {
    Expense.findAll({
        where:{
            id:req.session.user_id
        },
        attributes:[
            "id",
            "title",
            "description",
            "expense_value",
            "date_due",
        ],
        order:[["date_due",'DESC']]
    })
})


module.exports = router;