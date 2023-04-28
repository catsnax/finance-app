const express = require('express');
var nodemailer = require('nodemailer');
const app = express();
const mongoose = require('mongoose');
const Loan = require('./models/loan')
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

app.get("/", (req, res) =>{

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
            newArray[i].nextPayAmount = `₱${parseInt(result[i].totalLoan * result[i].interestRate)}`;
            //date formatter
        
            index = result[i].indexNumber;

            const month = result[i].payDate.getMonth() + 1; // Note that the month index starts at 0, so we need to add 1 to get the correct month
            const day = result[i].payDate.getDate();
            const year = result[i].payDate.getFullYear();
            newArray[i].payDate = dateFormatter(day, month, year);

            if(new Date() >= result[i].nextPayDate[index]){

                result[i].nextPayDate.push(addDays(result[i].nextPayDate[index], 15));

                result[i].indexNumber += 1;
                result[i].nextPayStatus.push("Not Paid");
                result[i].save();

                let mailOptions = {
                    from: 'ajjmacias@addu.edu.ph', // sender address
                    to: 'aaron.justin.macias@gmail.com', // list of receivers
                    subject: 'Loan Due ✔', // Subject line
                    text: `${result[i].name}'s interest payment of ${newArray[i].nextPayAmount} is due on ${dateFormatter(result[i].nextPayDate[index].getDate(), result[i].nextPayDate[index].getMonth() + 1 , result[i].nextPayDate[index].getFullYear())} ` // plain text body
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
        }
     
    }).then(() => {
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
        result.save();
    })

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
 