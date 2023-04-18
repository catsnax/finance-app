import React, {useState, useEffect} from 'react';
import header from './ViewLoan.module.css';
import { useTable } from 'react-table';

function ViewLoan(props) {
    
    const realData = props.prop;


    const rows = realData.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.totalLoan}</td>
          <td>{item.interestRate}</td>
          <td>{item.payDate}</td>
        </tr>
      ));
    


  
    
  
    

return (
    <table id = {header.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Total Loan</th>
          <th>Interest Rate</th>
          <th>Pay Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
export default ViewLoan;