const axios = require('axios');
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json())

app.listen(port, () =>{
    console.log("ready");
}); 


app.get('/api', (req, res) =>{
    const data = {name: 'Aaron', interestRate: 0.09, loanedMoney: 5000};
    const jsonData = JSON.stringify(data);
    res.send(jsonData);
})

app.post('/api', (req, res) => {
    console.log(req.body);
})




 