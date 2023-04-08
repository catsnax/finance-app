const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Loan = require('./models/loan')


const port = 5000;

const dbURI = "mongodb+srv://aaronjustinmacias:Aaronisreal4@cluster0.fwpywtd.mongodb.net/Finance?retryWrites=true&w=majority"

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("connected to database");
    app.listen(port);
})
.catch((err) => console.log(err));

app.use(express.json())

app.get("/", (req, res) =>{
    const loan = new Loan({
        name: "Wow",
        totalLoan: 30000,
        interestRate: 0.09,
        nextPay: 500,
        payDate: "09/04/2023",
    });

    loan.save()
    .then((result) => {console.log(result)})
    .catch((err) => console.log(err));
})

app.get('/api', (req, res) =>{
    const data = {name: 'Aaron', interestRate: 0.09, loanedMoney: 5000};
    const jsonData = JSON.stringify(data);
    res.send(jsonData);
})

app.post('/api', (req, res) => {
    console.log(req.body);
})




 