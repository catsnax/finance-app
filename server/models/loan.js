const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
    name: String,
    totalLoan: Number,
    interestRate: Number,
    nextPay: Number,
    payDate: Date


}, {timestamps: true});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;

