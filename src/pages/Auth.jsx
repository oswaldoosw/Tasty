import React from "react";
import { useParams } from "react-router-dom";
import SignIn from "../components/SignIn.jsx";
import SignUp from "../components/SignUp.jsx";

function Auth() {
    let parameter = useParams();

    return (
        <div style={{margin: "0% 20%" }}>
            
        {parameter.authtype === "signin" ? 
            <SignIn />
            :
            <SignUp />
        }
        </div>
        
    );
}

export default Auth;