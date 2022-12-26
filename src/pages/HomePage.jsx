import Vegetarian from "../components/Vegetarian";
import Popular from "../components/Popular";
import SearchBar from "../components/SearchBar";
import Group from "../components/Group";
import FeaturedSlider from "../components/FeaturedSlider.jsx";
import React from "react";

function HomePage() {
    return (
        <div>
            <SearchBar />
            <Group />
            <FeaturedSlider />
            <Vegetarian />
            <Popular />
        </div>
    );
}

export default HomePage;

