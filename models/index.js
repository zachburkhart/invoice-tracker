const User = require('./User');
const Expense = require('./Expense');

User.hasMany(Expense, {
    foreignKey: 'user_id'
});

Expense.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Expense };