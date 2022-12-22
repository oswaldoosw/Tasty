import React from 'react';
import styled from "styled-components";

function FeaturedSlider(props) {

    const [currentSlide, updateCurrentSlide] = React.useState(0);
    const fetchFeatured = async () => {
       
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=4`);
        const data = await api.json();
        updateCurrentSlide(data.recipes);
        
    }

    return (
        <StyledDiv>
            ImageSlider
        </StyledDiv>
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