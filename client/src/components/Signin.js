const Signin = () => {

    return ( 
        <div className = "body">
            
            <div className = "mainBox">
                <p id = "signedIn"> Already have an account? <strong> Sign in</strong></p>

                <div> 
                    <h2 className = "head"> Sign In</h2>

                    <p className = "label"> Email Address</p>
                    <input className = "credential"></input>

                    <p className = "label"> Password</p>
                    <input className = "credential"></input>

                    <button id = "suButton"> Sign In</button>
                </div>

            </div>


        </div>
     );
}
 
export default Signin;