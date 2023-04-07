import React, {useState, useEffect} from 'react';
import './Signup.css';
import Signup from './Signup';
function App() {

  const [user, newUser] = useState();

  useEffect(() => {
    fetch('/api')
    .then(res => {return res.json()})
    .then(data => newUser(data) )

  }, []);

  
  return (
    <div className="App">
      <Signup></Signup>
    </div>
  );
}

export default App;
