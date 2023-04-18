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
    console.log("hello");
})

app.get('/api', (req, res) =>{
    Loan.find()
    .then((result) =>{
        newArray = []
        for(i = 0; i < result.length; i++){
            newArray[i] = new Object();
            newArray[i].name = result[i].name;
            newArray[i].totalLoan = result[i].totalLoan;
            newArray[i].interestRate = result[i].interestRate;

            const month = result[i].payDate.getMonth() + 1; // Note that the month index starts at 0, so we need to add 1 to get the correct month
            const day = result[i].payDate.getDate();
            const year = result[i].payDate.getFullYear();

            const formattedDate = `${month}-${day}-${year}`;


            newArray[i].payDate = formattedDate;
        }

        const jsonData = JSON.stringify(newArray);
        res.send(jsonData);
    })

    
    
})

app.post('/api', (req, res) => {
    console.log(req.body);
})

app.post('/loan', (req, res) =>{
    console.log(req.body);
    const loan = new Loan({
        name: req.body.Name,
        totalLoan: req.body.Amount,
        interestRate: parseFloat(req.body.Interest),
        payDate: req.body.Date
    })

    loan.save()
    .then((result) => {
        console.log()
    })
    .catch((err) => {
        console.log(err);
    })

})




 