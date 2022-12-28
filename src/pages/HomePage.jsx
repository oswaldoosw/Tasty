import Vegetarian from "../components/Vegetarian";
import Popular from "../components/Popular";
import SearchBar from "../components/SearchBar";
import Group from "../components/Group";
import styled from "styled-components";
import React from "react";

function HomePage() {
    return (
        <div>
            <SearchBar />
            <Group />
            <Content>
                <Vegetarian />
                <Popular />
            </Content>
        </div>
    );
}

const Content = styled.div`
  margin: 0% 20%; 
`;

export default HomePage;

