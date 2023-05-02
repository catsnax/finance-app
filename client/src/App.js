import { Link, Route, Routes } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Details from './components/Details';
import AddLoan from './components/AddLoan';
import ViewLoan from './components/ViewLoan';
import Home from './components/Home';

function App() {

  const [user, newUser] = useState(null);
  const [account, newAccount]  = useState(null);

  

  useEffect(() => {
    fetch('http://localhost:4000/api')
    .then(res => {return res.json()})
    .then(data => {
      newUser(data);
    })  
  }, );

  /*useEffect(() => {
    fetch('http://localhost:4000/account')
    .then( res => {return res.json})
    .then( data => {
      newAccount(data);
    })
  }, )*/

  

  
  return ( 
  <Routes>

    <Route path = "/Add" element ={<AddLoan/>}/>
    {user && <Route path="/View" element={<ViewLoan prop={user} />} render={(props) => <ViewLoan {...props} />}/>}
    <Route path = "/" element ={<Home/>}></Route>
    <Route path = "/Details" element = {<Details/>}></Route>
  </Routes>
  )
}

export default App;