import React, { useEffect } from 'react'
import styled from "styled-components";
import DishCard from "./DishCard.jsx";

function Popular() {
    const [popular, updatePopular] = React.useState([]);

    function createRecipe(recipe) {
        return (
                <DishCard key={recipe.id}
                        id={recipe.id}
                        title={recipe.title} 
                        servings={recipe.servings} 
                        image={recipe.image} 
                        ready={recipe.readyInMinutes} 
                />
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
            <h3>Popular</h3>
            <Wrapper>
                
                            {popular.map(createRecipe)}
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 3rem;

    p {
        position: relative;
        z-index: 10;
        font-weight: 600;
        font-size: 1rem;
    }
`;


export default Popular;