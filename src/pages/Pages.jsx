import React from "react";
import HomePage from "./HomePage";
import Searched from "./Searched";
import FoodRecipe from "./FoodRecipe";
import { Route, Routes } from "react-router-dom";
import Dishes from "./Dishes";

function Pages() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dishes/:paramtype" element={<Dishes />} />
            <Route path="/searched/:paramsearch" element={<Searched />} />
            <Route path="/foodrecipe/:paramname" element={<FoodRecipe />} />
        </Routes>
    );
}

export default Pages;