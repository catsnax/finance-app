const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    totalMoney: Number,
    investedMoney: Number,
    cashMoney: Number,
    totalExpenses: Number,
    arrayExpenses: Array,
    dateMonth: Number,
});

const account = mongoose.model('account', accountSchema);

module.exports = account;