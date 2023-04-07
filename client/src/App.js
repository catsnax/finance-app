import { Link, Route, Routes } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import './Signup.css';
import Signin from './Signin';
import Signup from './Signup';
function App() {

  const [user, newUser] = useState();

  useEffect(() => {
    fetch('/api')
    .then(res => {return res.json()})
    .then(data => newUser(data) )

  }, []);

  
  return  <Routes>
    <Route path = "/" element ={<Signup/>}/>
    <Route path = "/Signin" element = {<Signin/>}/>
      </Routes>
  
}

export default App;
