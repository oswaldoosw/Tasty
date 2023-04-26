import React from 'react';
import { Link, useLocation } from "react-router-dom";
import styled from 'styled-components';

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
        <Wrapper>
            <div style={{width: "70%", border: "2px solid black", borderRadius: "24px"}}>
                <form onSubmit={handleSubmit}>
                    <h1 style={{margin: "2rem 0rem"}}>Sign Up</h1>
                    <div>
                        <StyledInput placeholder="Name" type="text" onChange={(e) => {updateName(e.target.value)}}></StyledInput>
                        <StyledInput placeholder="Email Address" type="text" onChange={(e) => {updateEmail(e.target.value)}}></StyledInput>
                        <StyledInput placeholder="Password" type="password" onChange={(e) => {updatePassword(e.target.value)}}></StyledInput>
                    </div>
                    <StyledButton>Sign Up</StyledButton>
                    <p style={{marginTop: '3rem'}}>Already have an account? <Link to={'/auth/signin'} state={{ previousPath: previousPath }}>Sign In</Link></p>
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


export default SignUp;