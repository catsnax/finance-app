const express = require('express');
var nodemailer = require('nodemailer');
const app = express();
const mongoose = require('mongoose');
const Loan = require('./models/loan')
const Account = require('./models/account');
const cors = require('cors');

const port = 4000;

const dbURI = "mongodb+srv://aaronjustinmacias:Aaronisreal4@cluster0.fwpywtd.mongodb.net/Finance?retryWrites=true&w=majority"

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("connected to database");
    app.listen(port);
})
.catch((err) => console.log(err));

app.use(express.json())

app.use(cors());


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'ajjmacias@addu.edu.ph', // your email
        pass: 'Aaronisreal4' // your email password
    }
});

app.post("/home", (req, res) => {

})


app.get("/", (req, res) =>{
    console.log("account made");
    const account = new Account({
        totalMoney: 100000,
        investedMoney: 50000,
        cashMoney: 50000,
        totalExpenses: 0,
        dateMonth: new Date().getMonth(),
    });
    account.save()
    .then((result) =>{
        console.log(result);
    })
    .catch((err) =>{
        console.log(err);
    })
})

app.get('/account', (req, res) =>{
    let account = new Object();
    let total = 0;
    let todayDate = new Date().getMonth();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    account.totalMoney = 0
    Account.find()
    .then((result) =>{
        
        Loan.find()
        .then((loans) => {
            
            loans.map(loan =>{
                account.totalMoney += loan.totalInterest;
                total+= parseInt(loan.totalLoan);
                
            })
            account.totalMoney += result[0].totalMoney;
            result[0].investedMoney = total;

            if(todayDate > result[0].dateMonth) {
                result[0].dateMonth++;
                result[0].totalExpenses = 0;
            }

            result[0].save();
        })

        .then(() => {
                
            account.dateMonth = months[result[0].dateMonth];
            
            //liquidated cash is calculated from subtracting total money and invested money
            result[0].cashMoney = parseInt(result[0].totalMoney) - parseInt(result[0].investedMoney);
            account.cashMoney = result[0].cashMoney;
            
            account.investedMoney = result[0].investedMoney;
            account.totalExpenses = result[0].totalExpenses;
        }) 
        .then(() =>{
            const jsonData = JSON.stringify(account);
            res.send(jsonData);
        })
    })
    

    
})

app.post('/reset', (req, res) => {
    let money = req.body.totalMoney;
    console.log("post request made");
    Account.find()
    .then((result) =>{
        result[0].totalMoney = money;
        result[0].save();
        
    })
})

app.post('/add', (req, res) => {
    console.log("post request made");
    let addedMoney = parseInt(req.body.money);
    Account.find()
    .then((result) => {
        result[0].totalMoney = parseInt(result[0].totalMoney);
        result[0].totalMoney += addedMoney;
        result[0].save();
    })
})

app.post('/expense', (req, res) => {
    inputExpense = parseInt(req.body.expense)
    Account.find()
    .then((result) =>{
        result[0].totalMoney = parseInt(result[0].totalMoney);
        result[0].totalMoney -= inputExpense;

        result[0].totalExpenses = parseInt(result[0].totalExpenses);
        result[0].totalExpenses += inputExpense;
        result[0].save();
    })
})

app.get('/api', (req, res) =>{
    Loan.find()
    .then((result) =>{
        newArray = []
        for(i = 0; i < result.length; i++){
            newArray[i] = new Object();
            newArray[i].id = result[i]._id;
            newArray[i].name = result[i].name;
            newArray[i].totalLoan = `₱${result[i].totalLoan}`;
            newArray[i].interestRate = `${parseInt(result[i].interestRate * 100)}%`;
            newArray[i].nextPayAmount = parseInt(result[i].totalLoan * result[i].interestRate);
            //date formatter
        
            index = result[i].indexNumber;

            const month = result[i].payDate.getMonth() + 1; // Note that the month index starts at 0, so we need to add 1 to get the correct month
            const day = result[i].payDate.getDate();
            const year = result[i].payDate.getFullYear();
            newArray[i].payDate = dateFormatter(day, month, year);

            let dateCounter = result[i].nextPayDate[index];

            while(new Date() >= dateCounter){

                result[i].nextPayDate.push(addDays(result[i].nextPayDate[index], 15));
                dateCounter = addDays(dateCounter, 15);

                result[i].indexNumber += 1;
                index = result[i].indexNumber; 
                result[i].nextPayStatus.push("Not Paid");
                

                let mailOptions = {
                    from: 'ajjmacias@addu.edu.ph', // sender address
                    to: 'aaron.justin.macias@gmail.com', // list of receivers
                    subject: 'Loan Due ✔', // Subject line
                    text: `${newArray[i].name}'s interest payment of ${newArray[i].nextPayAmount} is due on ${dateFormatter(result[i].nextPayDate[index].getDate(), result[i].nextPayDate[index].getMonth() + 1 , result[i].nextPayDate[index].getFullYear())} ` // plain text body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                });   

            }  

            
            payDateArrayVar = []
            for(j = 0; j < result[i].nextPayDate.length; j++){
                formatVariable = dateFormatter(result[i].nextPayDate[j].getDate(), result[i].nextPayDate[j].getMonth() + 1 , result[i].nextPayDate[j].getFullYear());
                payDateArrayVar.push(formatVariable);
            }

            payStatusArray = [];
            for(k = 0; k < result[i].nextPayStatus.length; k++){
                payStatusArray.push(result[i].nextPayStatus[k]);
            }
            
            newArray[i].payDateArray = payDateArrayVar;
            newArray[i].payStatusArray = payStatusArray;

            newArray[i].latestPayDate = payDateArrayVar[index];
            result[i].save()
        }
    })
    .then(() => {
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
        payDate: req.body.Date,
        nextPayDate: [addDays(req.body.Date, 15)],
        nextPayStatus: ["Not Paid"],
        interestAmount: parseFloat(req.body.Interest) * req.body.Amount,
        indexNumber: 0,
        totalInterest: 0,
    })

    loan.save()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })

})

app.get('/details', (req, res) => {
    id = req.query.id;
    Loan.findById(id)
    .then((result) =>{
        
        
        const jsonData = JSON.stringify([result.nextPayStatus, result.nextPayDate]);
        res.send(jsonData);
        console.log(jsonData)

    })
})

app.post('/details', (req, res) =>{
    id = req.body.ID;
    newStatusArray = req.body.payStatusArray
    Loan.findById(id)
    .then((result) => {
        result.nextPayStatus = newStatusArray;
        result.nextPayStatus.map(status =>{
            if(status == "Paid"){
                result.totalInterest += result.interestAmount
            }
        })

        result.save();
    })

})

app.delete('/details', (req, res) =>{
    id = req.body.ID;
    try {
        const result = Loan.deleteOne({ _id: id }).then(() =>{
            res.send(result);
        }) 
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
})

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function dateFormatter(day, month, year){
    let formattedDate = "";

    if(parseInt(day) < 10 && parseInt(month) < 10) formattedDate = `0${month}-0${day}-${year}`;  
    else if(parseInt(day) < 10) {formattedDate = `${month}-0${day}-${year}`;}
    else if(parseInt(month) < 10) {formattedDate = `0${month}-${day}-${year}`;}
    else{formattedDate = `${month}-${day}-${year}`;}

    return formattedDate;
}
 