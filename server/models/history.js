const mongoose = require('mongoose');
const Schema = mongoose.Schema;

hello = function createNew(name){

    const loanSchema = new Schema({
        name: String,
        totalLoan: Number,
        interestRate: Number,
        nextPay: Number,
        payDate: Date,
        nextPayDate: Array,
        interestAmount: Number,
    }, {timestamps: true});
    
    const Loaner = mongoose.model(name, boarderSchema);

    return Loaner;
}

module.exports = hello;