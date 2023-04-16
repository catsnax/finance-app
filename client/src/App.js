import { Link, Route, Routes } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import AddLoan from './components/AddLoan';
import ViewLoan from './components/ViewLoan';

function App() {

  const [user, newUser] = useState();

  console.log("hello");

  useEffect(() => {
    fetch('/api')
    .then(res => {return res.json()})
    .then(data => {
      newUser(data);
    })

  }, []);

  
  return  <Routes>
    <Route path = "/" element ={<AddLoan/>}/>
    <Route exact path="/View" element={<ViewLoan prop={user} />} render={(props) => <ViewLoan name="John" {...props} />}/>
      </Routes>
  
}

export default App;
