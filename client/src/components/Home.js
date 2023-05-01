import React, {useState, useEffect} from 'react';
import header from './Home.module.css';
import { Link, Route, Routes} from 'react-router-dom';



const Home = () => {

    return ( 
        <div id = {header.body}>
        <div id = {header.FinanceLogo}> FinanceApp</div>
        <div className = {header.sidebarBox}>
        
            <Link to = "/Signin" className = {header.sideElement}> Home</Link>
            <div id = {header.view}className = {header.sideElement}> View Loans</div>
            <Link to = "/" id = {header.Loans} className = {header.sideElement}> Create Loans</Link>
            <div id = "Data" className = {header.sideElement}> Data</div>
        </div>

        <form>
        <div id = {header.mainContent}>
        <input id = {header.input}/> <button> ADD MONEY</button>

        <h2> General Finances</h2>

        <div> TOTAL MONEY</div>

        <div> INVESTED MONEY</div>

        <div> LIQUIDATED CASH</div>

        </div>

        </form>
        </div>
     );
}
 
export default Home;