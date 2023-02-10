import React, { useEffect } from "react";
import Auth from "./Auth";
import HomePage from "./HomePage";
import Searched from "./Searched";
import FoodRecipe from "./FoodRecipe";
import { Route, Routes } from "react-router-dom";
import Dishes from "./Dishes";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Pages() {
    const [userData, updateUserData] = React.useState({
        name: "",
    });

    useEffect(() => {
        if (localStorage.getItem("token") !== null){
            componentDidMount();
        }
        
    },[]);
    function componentDidMount() {
        fetch("http://localhost:5000/user", {
            method:"POST",
            crossDomain:"true",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow_Origin":"*",
            },
            body:JSON.stringify({
                token: localStorage.getItem("token"),
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "UserData");
            updateUserData(data.data)
        })

    }

    return (
        <div>
            <NavBar namee={userData.name}/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dishes/:paramtype" element={<Dishes />} />
                <Route path="/searched/:paramsearch" element={<Searched />} />
                <Route path="/foodrecipe/:paramname" element={<FoodRecipe />} />
                <Route path="/auth/:authtype" element={<Auth />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default Pages;