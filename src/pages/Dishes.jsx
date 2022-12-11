import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function Dishes() {

    const [dishes, updateDishes] = React.useState([]);
    let parameter = useParams();

    function createDish(dish) {
        return (
            <Card key={dish.id}>
                <img src={dish.image} alt="" />
                <h4>{dish.title}</h4>
            </Card>
        )
    }

    useEffect(() => {
        getDishes(parameter.paramtype);
    },[parameter]);

    const getDishes = async (dishName) => {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${dishName}`)
        const data = await api.json();
        updateDishes(data.results);
    }
    return (
        <Grid>
            {dishes.map(createDish)}
        </Grid>
    );
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
export default Dishes;