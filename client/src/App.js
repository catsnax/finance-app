import { Link, Route, Routes } from 'react-router-dom';
import React, {useState, useEffect} from 'react';


import Signin from './components/Signin';
import Signup from './components/Signup';
import AddLoan from './components/AddLoan';
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
