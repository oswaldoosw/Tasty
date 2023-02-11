import React from 'react';
import { Link, useLocation } from "react-router-dom";

function SignUp() {
    const [name, updateName] = React.useState();
    const [email, updateEmail] = React.useState();
    const [password, updatePassword] = React.useState();
   
    const location = useLocation();
    const { previousPath } = location.state;

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:5000/register", {
            method:"POST",
            crossDomain:"true",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow_Origin":"*",
            },
            body:JSON.stringify({
                name,
                email,
                password,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "UserRegister");
            if (data.status === "User exists")
                alert("Email Already in Use");
            else
                alert("Successfully Registered");
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div>
                <p>Name</p>
                <input type="text" onChange={(e) => {updateName(e.target.value)}}></input>
                <p>Email</p>
                <input type="text" onChange={(e) => {updateEmail(e.target.value)}}></input>
                <p>Password</p>
                <input type="password" onChange={(e) => {updatePassword(e.target.value)}}></input>
            </div>
            <button>Sign Up</button>
            <p>Already have an account?<Link to={'/auth/signin'} state={{ previousPath: previousPath }}>Sign In</Link></p>
        </form>
    );
}




export default SignUp;