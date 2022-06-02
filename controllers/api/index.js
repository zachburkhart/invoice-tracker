const router = require('express').Router();

const userRoutes = require('./user-routes');
const expenseRoutes = require('./expense-routes');

router.use('/users', userRoutes);
router.use('/expense', expenseRoutes);




module.exports = router;