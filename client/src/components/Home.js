import React, {useState, useEffect} from 'react';
import header from './Home.module.css';
import { Link, Route, Routes} from 'react-router-dom';
import {useLocation} from 'react-router-dom';



const Home = () => {

    const [account, newAccount]  = useState(null);

    const [total, setTotal] = useState(null);
    const [invested, setInvested] = useState(null);
    const [liquid, setLiquid] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [month, setMonth] = useState(null);


    useEffect(() => {
        fetch('http://localhost:4000/account')
        .then(res => {return res.json()})
        .then(data => {
          newAccount(data);

        })  
        .then(() =>{
            setTotal(account.totalMoney.toLocaleString("en-US"));
            setInvested(account.investedMoney.toLocaleString("en-US"));
            setLiquid(account.cashMoney.toLocaleString("en-US"));
            setExpenses(account.totalExpenses.toLocaleString("en-US"));
            setMonth(account.dateMonth);
        })
      }, [account]);
    



    




    const handleReset = () =>{
        let inputMoney = window.prompt("Enter money reset");
        const url = 'http://localhost:4000/reset';
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ totalMoney: inputMoney})
        })
        .then(response => {response.json()} )
        .catch(error => console.error(error));
    }

    const handleAdd = () =>{
        let addedMoney = window.prompt("Enter Add Money");
        
        const url = "http://localhost:4000/add";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({money: addedMoney})
        })
        .then(response => response.json)
        .catch((err) => console.log(err));
    }

    const handleExpense = () =>{
        let inputExpense = window.prompt("Enter Expense");
        
        const url = "http://localhost:4000/expense";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({expense: inputExpense})
        })
        .then(response => response.json)
        .catch((err) => console.log(err));
    }


    return ( 
        <div id = {header.body}>
        <div id = {header.FinanceLogo}> FinanceApp</div>
        <div className = {header.sidebarBox}>
        

            <div id = {header.view}className = {header.sideElement}> Home</div>
            <Link to = "/View" className = {header.sideElement}> View Loans</Link>
            
            <Link to = "/Add" id = {header.Loans} className = {header.sideElement}> Create Loans</Link>
            <div id = "Data" className = {header.sideElement}> Data</div>
        </div>

        
        <div id = {header.mainContent}>
        <button onClick = {handleAdd} class = {header.button}> ADD MONEY</button><br></br>
        <button onClick = {handleExpense} class = {header.button}> ADD EXPENSE</button> <br></br>
        <button onClick = {handleReset} class = {header.button}> RESET TOTAL MONEY</button>

        <h2> General Finances</h2>

        <div id = {header.container}>

            <div>
                <div class = {header.financeHeader}> TOTAL MONEY</div>
                <div class = {header.money}> ₱{total}</div>

                <div class = {header.financeHeader}> INVESTED MONEY </div>
                <div class = {header.money}> ₱{invested} </div>

                <div class = {header.financeHeader}> LIQUIDATED CASH </div>
                <div class = {header.money}> ₱{liquid}</div>

            </div>

            <div> 

                <div class = {header.financeHeader}> TOTAL EXPENSES ({month}) </div>
                <div class = {header.money}>₱{expenses}</div>
            </div>

        </div>


        </div>

       
        </div>
     );
}
 
export default Home;