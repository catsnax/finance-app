import { Link, Route, Routes } from 'react-router-dom';
import header from './AddLoan.module.css';
const AddLoan = () => {
    return ( 
        <div>
            <div className = {header.sidebarBox}>
                <div id = "Home" className = {header.sideElement} > Home</div>
                <div id = "Expenses" className = {header.sideElement}> Expenses</div>
                <div id = "Loans" className = {header.sideElement}> Loans</div>
                <div id = "Data" className = {header.sideElement}> Data</div>
            </div>

            <div id = {header.main}>
                <h1> CREATE LOAN</h1>


            </div>

        </div>
        

     );
}
 
export default AddLoan;