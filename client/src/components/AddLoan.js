import { Link, Route, Routes } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import header from './AddLoan.module.css';

const AddLoan = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [interest, setInterest] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = () =>{
        const url = '/api';
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name: name, Amount: amount, Interest: interest, Date: date })
        })
        .then(response => response.json())
        .catch(error => console.error(error))
        }

        const handleInputChangeName = (event) => {
            setName(event.target.value);
        }

        const handleInputChangeAmount = (event) => {
            setAmount(event.target.value);
        }




    return ( 
        <div>
            <div id = {header.FinanceLogo}> FinanceApp</div>
            <div className = {header.sidebarBox}>
                <div id = "Home" className = {header.sideElement} > Home</div>
                <div id = "Expenses" className = {header.sideElement}> Expenses</div>
                <div id = {header.Loans} className = {header.sideElement}> Loans</div>
                <div id = "Data" className = {header.sideElement}> Data</div>
            </div>

            <div id = {header.main}>
                <h1> CREATE LOAN</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className = {header.labels} value = {name} onChange={handleInputChangeName}> Loaner Name </div>
                    <input/>

                    <div className = {header.labels} value = {amount} onChange={handleInputChangeAmount}> Loaned Amount</div>
                    <input/>

                    <div className = {header.labels}> Interest Rate</div>
                    <select>
                        <option> 5%</option>
                        <option> 6%</option>
                    </select>
                    
                    <div className = {header.labels}> Starting Date</div>
                    <input id = {header.date} type ="date"/>

                    <button id = {header.submit}> Submit Loan</button>

                </form>

            </div>
        </div>
     );
}
 
export default AddLoan;