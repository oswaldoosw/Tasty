import React from 'react';
import { Link } from "react-router-dom";

function SignIn() {
    const [email, updateEmail] = React.useState();
    const [password, updatePassword] = React.useState();

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:5000/login", {
            method:"POST",
            crossDomain:"true",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow_Origin":"*",
            },
            body:JSON.stringify({
                email,
                password,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "UserLogin");
            if (data.status === "ok"){
                alert("Login Successful");
                localStorage.setItem("token", data.data);
                window.location.href = "/";
            }
            
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <div>
                <p>Email</p>
                <input type="text" onChange={(e) => {updateEmail(e.target.value)}}></input>
                <p>Password</p>
                <input type="password" onChange={(e) => {updatePassword(e.target.value)}}></input>
            </div>
            <button>Sign In</button>
            <p>Don't have an account?<Link to={'/auth/signup'}>Sign Up</Link></p>
            
        </form>
    );
}




export default SignIn;