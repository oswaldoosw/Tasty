import React, { useEffect } from 'react';
import styled from "styled-components";
import newFoods from "../assets/newFoods.js";

function FeaturedSlider(props) {

    const [currentSlide, updateCurrentSlide] = React.useState(0);
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
        <div style={{ width: "80%", margin: "0rem auto", height: "25rem", position: "absolute", paddingTop: "2rem"}}>
            <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(https://1.bp.blogspot.com/-wrbmTCP28g0/YKEHDx_SrHI/AAAAAAADOzQ/PrYlKKZVjJsbL6cE1CEzLJCyN2nGlaPSQCLcBGAsYHQ/s4508/Cover%2Bpasta.JPG)`}}></div>
        </div>
    );
  };

// const StyledDiv = styled.div`
//     width: 100%;
//     height: 100%;
//     border-radius: 10px;
//     background-position: center;
//     background-color: cover;
// `;

  export default FeaturedSlider;