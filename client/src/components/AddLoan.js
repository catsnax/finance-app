import { Link, Route, Routes } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import header from './AddLoan.module.css';

const AddLoan = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [interest, setInterest] = useState('0.05');
    const [date, setDate] = useState('');
    

    const handleSubmit = () =>{
        console.log("submitted");
        const url = '/loan';
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
        const handleInputChangeInterest = (event) => {
            setInterest(event.target.value);
        }
        const handleInputChangeDate = (event) => {
            setDate(event.target.value);
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
                    <div className = {header.labels} > Loaner Name </div>
                    <input value = {name} onChange={handleInputChangeName}/>

                    <div className = {header.labels} > Loaned Amount</div>
                    <input value = {amount} onChange={handleInputChangeAmount}/>

                    <div className = {header.labels} > Interest Rate</div>
                    <select value = {interest} onChange={handleInputChangeInterest}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                    
                    <div className = {header.labels}> Starting Date</div>
                    <input value = {date} onChange={handleInputChangeDate} id = {header.date} type ="date"/>

                    <button id = {header.submit}> Submit Loan</button>

                </form>

            </div>
        </div>
     );
}
 
export default AddLoan;