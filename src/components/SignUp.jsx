import React, { useEffect } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

function SignUp() {
    const [name, updateName] = React.useState();
    const [email, updateEmail] = React.useState();
    const [password, updatePassword] = React.useState();
   

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
        .then((data) => {console.log(data, "UserRegister");})
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
            <p>Already have an account?<Link to={'/auth/signin'}>Sign In</Link></p>
        </form>
    );
}




export default SignUp;