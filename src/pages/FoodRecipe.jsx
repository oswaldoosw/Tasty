import styled from "styled-components";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function FoodRecipe() {
    
    const [foodDetails, updateDetails] = React.useState({});
    let parameter = useParams();

    const getFoodDetails = async () => {
        const api = await fetch (`https://api.spoonacular.com/recipes/${parameter.paramname}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const data = await api.json();
        updateDetails(data)
    };

    useEffect(() => {
        getFoodDetails();
    },[parameter.name]);

    return (<div>{foodDetails.title}</div>);
}

const Wrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;

    .active {
        background: linear-gradient(35deg, #353535, #484848);
        color: white;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: 2rem;
    }
`

export default FoodRecipe;