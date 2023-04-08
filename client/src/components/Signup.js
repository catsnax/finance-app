import { Link, Route, Routes } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () =>{
        const url = '/api';
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: email, Password: password })
        })
        .then(response => response.json())
        .catch(error => console.error(error))
        }

        const handleInputChangeEmail = (event) => {
            setEmail(event.target.value);
        }

        const handleInputChangePassword = (event) => {
            setPassword(event.target.value);
        }
    return ( 
        <div className = "body">
            
            <div className = "mainBox">
                <form onSubmit={handleSubmit}>
                    <p id = "signedIn"> Already have an account? <Link to = "/Signin"> Sign in</Link> </p>

                    <div> 
                        <h2 className = "head"> Create Account</h2>

                        <p className = "label"> Email Address</p>
                        <input className = "credential" value = {email} onChange={handleInputChangeEmail}></input>

                        <p className = "label"> Password</p>
                        <input className = "credential" value = {password} onChange = {handleInputChangePassword} ></input>

                        <button id = "suButton"> Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
        
     )
    }; 

 
export default Signup;