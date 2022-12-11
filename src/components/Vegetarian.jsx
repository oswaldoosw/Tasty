import React, { useEffect } from 'react'
import styled from "styled-components"
import {Splide, SplideSlide} from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Vegetarian() {
    const [vegetarian, updateVeg] = React.useState([]);

    function createVeg(recipe) {
        return (
            <SplideSlide key={recipe.id}>
                <Card>
                    <Link to={'/foodrecipe/' + recipe.id}>
                        <p>{recipe.title}</p>
                        <img src={recipe.image} alt="{recipe.title}" />
                        <Grad />
                    </Link>
                </Card>
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
    margin: 4rem 0rem;
`;

const Card = styled.div`
    height: 15rem;
    width: 100%;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p {
        position: absolute;
        z-index: 10;
        bottom: 0%
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 150%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Grad = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`

export default Vegetarian;