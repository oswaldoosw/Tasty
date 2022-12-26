import React, { useEffect } from 'react';
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import DishCard from "./DishCard.jsx"


function Vegetarian() {
    const [vegetarian, updateVeg] = React.useState([]);
    
    function createVeg(recipe) {
        return (
            <SplideSlide key={recipe.id}>
                    <DishCard 
                        id={recipe.id}
                        title={recipe.title} 
                        servings={recipe.servings} 
                        image={recipe.image} 
                        ready={recipe.readyInMinutes} 
                    />
            </SplideSlide>
        );
    }

    useEffect(() => {
        fetchVeg();
    },[]);

    const fetchVeg = async () => {
        const check = localStorage.getItem("vegetarian");
        if(check){
            updateVeg(JSON.parse(check));
        }
        else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8&tags=vegetarian`);
            const data = await api.json();

            localStorage.setItem("vegetarian", JSON.stringify(data.recipes));
            updateVeg(data.recipes);
            console.log(data.recipes);
        }
    }

    return (
        <div>
            <Wrapper>
                <h3>Vegetarian</h3>
                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "3rem",
                }}>
                    {vegetarian.map(createVeg)}
                </Splide>
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    
    p {
        position: relative;
        z-index: 10;
        font-weight: 600;
        font-size: 1rem;
    }
`;

export default Vegetarian;