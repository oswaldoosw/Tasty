import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"

function Searched() {
    const [searchData, updateSearch] = useState([]);
    let parameter = useParams();

    function createSearchedDishes(searchedDish) {
        return (<Card key={searchedDish.id}>
            <img src={searchedDish.image} alt="" />
            <h4>{searchedDish.title}</h4>
        </Card>)
    }

    const getSearched = async (searchName) => {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${searchName}`)
        const data = await api.json();
        updateSearch(data.results);
        console.log(data.results);  
    }
    
    useEffect(() => {
        getSearched(parameter.paramsearch);
    },[parameter.paramsearch]);

    

    return (<Grid>
        {searchData.map(createSearchedDishes)}
    </Grid>);
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

export default Searched;