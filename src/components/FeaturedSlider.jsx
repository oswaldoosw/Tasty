import React, { useEffect } from 'react';
import styled from "styled-components";
import newFoods from "../assets/newFoods.js";

function FeaturedSlider(props) {

    const [currentSlide, updateCurrentSlide] = React.useState([]);
    const [indexx, updateIndex] = React.useState(0);
    const hola = [];
    const slideStyle = {
       
    }

    

    // useEffect(() => {
    //     fetchFeatured();
    // }, []);
    
    // const fetchFeatured = async () => {
       
    //     const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=2`);
    //     const data = await api.json();
    //     updateCurrentSlide(data.recipes);
        
    // }



    return (
        <div style={{height: "100%", position: "relative"}}>
            {console.log(newFoods)}
            {newFoods.map((recipe) => 
            {return (<div style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${recipe.image})`}}></div>)})}
        </div>
    );
  };

const StyledDiv = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-position: center;
    background-color: cover;
`;

  export default FeaturedSlider;