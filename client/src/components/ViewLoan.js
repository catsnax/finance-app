import React, {useState, useEffect} from 'react';
import header from './ViewLoan.module.css';
import { Link, Route, Routes} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function ViewLoan(props) {

    const navigate = useNavigate();
    const realData = props.prop;


    const handleClick = (wow) => {
      navigate('/Details',{state:{data: wow}});
    
    }

    const rows = realData.map(item => (
        <tr key={item.id}>
          <td> <button onClick =  {() => {handleClick(item)}}> view history</button></td>
          <td>{item.name}</td>
          <td>{item.totalLoan}</td>
          <td>{item.interestRate}</td>
          <td>{item.payDate}</td>
          <td> {item.nextPayAmount}</td>
          <td> {item.payDateArray[0]}</td>
        
        </tr>
      )); 

return (
    
    <div id = {header.body}>
        <div id = {header.FinanceLogo}> FinanceApp</div>
        <div className = {header.sidebarBox}>
        
            <Link to = "/Signin" className = {header.sideElement}> Home</Link>
            <div id = {header.view}className = {header.sideElement}> View Loans</div>
            <Link to = "/" id = {header.Loans} className = {header.sideElement}> Create Loans</Link>
            <div id = "Data" className = {header.sideElement}> Data</div>
        </div>
    <div className = {header.realTable}>
    <table id = {header.table}>
      <thead>
        <tr className = {header.tableHeader}>
          <th></th>
          <th>Name</th>
          <th>Total Loan</th>
          <th>Interest Rate</th>
          <th>Starting Date</th>
          <th>Next Pay</th>
          <th> Next Pay Date
            
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
    </div>
</div>
  );
};
export default ViewLoan;

