import React from 'react';
import { Link, useLocation } from "react-router-dom";
import styled from 'styled-components';

function SignIn() {
    const [email, updateEmail] = React.useState();
    const [password, updatePassword] = React.useState();

    const location = useLocation();
    const { previousPath } = location.state;


    function handleSubmit(e) {
        e.preventDefault();
        fetch("https://tasty-backend.vercel.app/login", {
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
        .then((res) => {return res.json()})
        .then((data) => {
            if (data.status === "ok"){
                alert("Login Successful");
                localStorage.setItem("token", data.data);
                window.location.href = previousPath;
            }
            else {
                alert("Invalid Email or Password");
            }
            
        })
    }

    return (
        <Wrapper>
            <div style={{width: "70%", border: "2px solid black", borderRadius: "24px"}}>
            <form onSubmit={handleSubmit}>
                <h1 style={{margin: "2rem 0rem"}}>Sign In</h1>
                <div>
                    <StyledInput placeholder="Email Address" type="text" onChange={(e) => {updateEmail(e.target.value)}}></StyledInput>
                    <br/>
                    <StyledInput placeholder="Password" type="password" onChange={(e) => {updatePassword(e.target.value)}}></StyledInput>
                </div>
                <StyledButton>Sign In</StyledButton>
                    <p style={{marginTop: '3rem'}}>Don't have an account? <Link to={'/auth/signup'} state={{ previousPath: previousPath }}>Sign Up</Link></p>
            </form>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
margin-top: 5rem;
    display: flex;
    justify-content: center;
    text-align: center;
`;

const StyledInput = styled.input`
    width: 60%;
    padding: 15px;
    border-bottom: 1px solid black;
    margin-bottom: 25px;
`;

const StyledButton = styled.button`
    width: 60%;
    height: 3rem;
    color: white;
    background: black;
    :hover{
        color: lightgreen;
      }
`;



export default SignIn;