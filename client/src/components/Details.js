import {useLocation} from 'react-router-dom';
import header from './Details.module.css';
import { Link, Route, Routes} from 'react-router-dom';
import React, {useState, useEffect} from 'react';

function DetailsLoan(){

    const location = useLocation();
    let data = location.state.data;
    let statusArray = data.payStatusArray;
    const id = data.id;

    const [payArray, setPayArray] = useState([]);
    
    useEffect(() => {
      fetch(`http://localhost:4000/details?id=${id}`)
      .then(res => {return res.json()})
      .then(result => {
        setPayArray(result);
      })  
  
    }, []);
    


    const handleInputChangeStatus = (event, index) => {
      const newArray = [...payArray];
      newArray[index] = event.target.value;
      setPayArray(newArray);
      

    }

    const handleFinishLoan = () => {
      console.log(data);
    }

    const handleSubmit = () =>{
      const url = 'http://localhost:4000/details';
      fetch(url, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ID: id, payStatusArray: payArray})
      })
      .then(response => {response.json()} )
      .catch(error => console.error(error));
      console.log(payArray);
      
      }
    

    const rows = data.payDateArray.map((item, index) => (
        <tr key={item.id}>
          <td>{item}</td>
          <td class = {header.selectBox} > 
            <select id = {header.select} value = {payArray[index]} onChange={(event) => handleInputChangeStatus(event, index)}>
              <option value="Not Paid">Not Paid</option>
              <option value="Paid">Paid</option>
            </select>
          </td>
          <td> {data.nextPayAmount}</td>
          <td> {index}</td>
        </tr>
      )
    ); 

    return ( 
      <div>

        <h1 id = {header.FinanceLogo}> FinanceApp</h1>
        <div className = {header.sidebarBox}>
        
            <Link to = "/Signin" className = {header.sideElement}> Home</Link>
            <div id = {header.view}className = {header.sideElement}> View Loans</div>
            <Link to = "/" id = {header.Loans} className = {header.sideElement}> Create Loans</Link>
            <div id = "Data" className = {header.sideElement}> Data</div>
        </div>

        <div className = {header.mainContent}>
          <div className = {header.headers}>
          <button onClick = {handleFinishLoan}id = {header.finishButton}> Finish Loan</button>
            <div> Name: {data.name} </div>
            <div> Loaned Money: {data.totalLoan} </div>
            <div> Interest Rate: {data.interestRate} </div>
            <div> Starting Date: {data.payDate}</div>
          </div>

          
          <button onClick={(handleSubmit)}> Save</button>



          <div className = {header.realTable}>
        <table id = {header.table}>
          <thead>
            <tr className = {header.tableHeader}>
              <th>Pay Date</th>
              <th>Pay Status</th>
              <th>Pay Amount</th>
              <th>On Time</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
    </div>

        </div>

    </div>



     );
  }
 
export default DetailsLoan;