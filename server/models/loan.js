const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
    name: String,
    totalLoan: Number,
    interestRate: Number,
    nextPay: Number,
    payDate: Date,
    nextPayDate: Array,
    indexNumber: Number,
    nextPayStatus: Array,
    interestAmount: Number,
    totalInterest: Number,
}, {timestamps: true});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;

