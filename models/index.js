const User = require('./User');
const Expense = require('./Expense');

<<<<<<< HEAD
=======
User.hasMany(Expense, {
    foreignKey: 'user_id'
});

Expense.belongsTo(User, {
    foreignKey: 'user_id'
});
>>>>>>> develop

module.exports = { User, Expense };