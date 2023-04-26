import {useLocation} from 'react-router-dom';
import header from './Details.module.css';
import { Link, Route, Routes} from 'react-router-dom';

function DetailsLoan(){

    const location = useLocation();

    let data = location.state.data;
    console.log(data);
    let name = data.name;
    let counter = 0;
    
    function countAdder(counter){
      counter++;
    }


    console.log(data.payDateArray);
    const rows = data.payDateArray.map(item => (
        <tr key={item.id}>
          <td>{item}</td>
          <td> {data.payStatusArray[counter]}</td>
          <td> {data.nextPayAmount}</td>
          <td> {counter}</td>
        </tr>
        
    
      )); 

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
            <div> Name: {name} </div>
            <div> Loaned Money: {data.totalLoan} </div>
            <div> Interest Rate: {data.interestRate} </div>
            <div> Starting Date: {data.payDate}</div>
          </div>

          <button id = {header.finishButton}> Finish Loan</button>

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