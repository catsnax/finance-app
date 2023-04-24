import { Link, Route, Routes } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Details from './components/Details';
import AddLoan from './components/AddLoan';
import ViewLoan from './components/ViewLoan';

function App() {

  const [user, newUser] = useState(null);

  

  useEffect(() => {
    fetch('http://localhost:4000/api')
    .then(res => {return res.json()})
    .then(data => {
      newUser(data);
      console.log(data);
    })  

  }, []);


  
  return ( 
  <Routes>
    {user && <Route path="/view" element={<ViewLoan prop={user} />} render={(props) => <ViewLoan {...props} />}/>}
    <Route path = "/" element ={<AddLoan/>}/>
    <Route path = "/Signin" element ={<Signin/>}/>
    <Route path = "/Details" element = {<Details/>}></Route>
  </Routes>
  )
}

export default App;