import React, { useEffect } from 'react'
import styled from "styled-components"
import {Splide, SplideSlide} from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import DishCard from "./DishCard.jsx";

function Popular() {
    const [popular, updatePopular] = React.useState([]);

    function createRecipe(recipe) {
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
        fetchPopular();
    },[]);

    const fetchPopular = async () => {
        const check = localStorage.getItem("popular");
        if(check){
            updatePopular(JSON.parse(check));
        }
        else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`);
            const data = await api.json();

            localStorage.setItem("popular", JSON.stringify(data.recipes));
            updatePopular(data.recipes);
            console.log(data.recipes);
        }

        
    }   
    return (
        <div>
            <Wrapper>
                <h3>Popular</h3>
                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "3rem",
                }}>
                    {popular.map(createRecipe)}
                </Splide>
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
        
    p {
        position: relative;
        z-index: 10;
        padding-bottom:12px;
        font-weight: 600;
        font-size: 1rem;
    }
`;

export default Popular;