import React, {useState, useEffect} from 'react';
import header from './ViewLoan.module.css';
import { useTable } from 'react-table';
import { Link, Route, Routes } from 'react-router-dom';

function ViewLoan(props) {
    
    const realData = props.prop;


    const rows = realData.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.totalLoan}</td>
          <td>{item.interestRate}</td>
          <td>{item.payDate}</td>
          <td> {item.nextPayAmount}</td>
          <td> {item.nextPayDate}</td>
        
        </tr>
      ));
    


  
    
  
    

return (
    
    <div id = {header.body}>
        <div id = {header.FinanceLogo}> FinanceApp</div>
        <div className = {header.sidebarBox}>
        
            <Link to = "/Signin" className = {header.sideElement}> Home</Link>
            <Link to = "/Signin" className = {header.sideElement}> View Loans</Link>
            <div id = {header.Loans} className = {header.sideElement}> Create Loans</div>
            <div id = "Data" className = {header.sideElement}> Data</div>
        </div>
    <div className = {header.realTable}>
    <table id = {header.table}>
      <thead>
        <tr className = {header.tableHeader}>
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