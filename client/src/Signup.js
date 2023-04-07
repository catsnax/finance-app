import { Link, Route, Routes } from 'react-router-dom';


const Signup = () => {

    return ( 
        <div className = "body">
            
            <div className = "mainBox">
                <p id = "signedIn"> Already have an account? <Link to = "/Signin"> Sign in</Link> </p>

                <div> 
                    <h2 className = "head"> Create Account</h2>

                    <p className = "label"> Email Address</p>
                    <input className = "credential"></input>

                    <p className = "label"> Password</p>
                    <input className = "credential"></input>

                    <button id = "suButton"> Sign Up</button>
                </div>

            </div>


        </div>
     );
}
 
export default Signup;