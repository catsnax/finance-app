import { Link, Route, Routes } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import './Signup.css';
import './AddLoan.css';
import Signin from './Signin';
import Signup from './Signup';
import AddLoan from './AddLoan';
function App() {

  const [user, newUser] = useState();

  useEffect(() => {
    fetch('/api')
    .then(res => {return res.json()})
    .then(data => newUser(data) )

  }, []);

  
  return  <Routes>
    <Route path = "/" element ={<AddLoan/>}/>
    <Route path = "/Signin" element = {<Signin/>}/>
      </Routes>
  
}

export default App;
