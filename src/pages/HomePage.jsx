import Vegetarian from "../components/Vegetarian";
import Popular from "../components/Popular";
import SearchBar from "../components/SearchBar";
import Group from "../components/Group";
import React from "react";

function HomePage() {
    return (
        <div>
            <SearchBar />
            <Group />
            <Vegetarian />
            <Popular />
        </div>
    );
}

export default HomePage;

