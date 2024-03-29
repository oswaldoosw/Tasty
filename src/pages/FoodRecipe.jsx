import styled from "styled-components";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection.jsx";
import Rating from "../components/Rating";
import Footer from "../components/Footer";


function FoodRecipe() {
    
    const [foodDetails, updateDetails] = React.useState({});
    const [pressedd, updatePressed] = React.useState('instructions');

    let parameter = useParams();

    useEffect(() => {
        const getFoodDetails = async () => {
            const api = await fetch (`https://api.spoonacular.com/recipes/${parameter.paramname}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
            const data = await api.json();
            updateDetails(data)
        };
        getFoodDetails();
    },[parameter.paramname]);

    return (<div>
                <Wrapper>
                    <div>
                        <div>
                            <h2>{foodDetails.title}</h2>
                            <img src={foodDetails.image} alt=""/>
                        </div>
                        <div>
                            <h3 style={{ marginBottom:"10px", }}>Rate This Recipe</h3>
                            <Rating param={parameter.paramname} />
                        </div>
                    </div>
                    <Info>
                        <Buttonn className={pressedd === 'instructions' ? "active" : ''} onClick={() => updatePressed('instructions')}>
                            Instructions
                        </Buttonn>
                        <Buttonn className={pressedd === 'ingredients' ? "active" : ''} onClick={() => updatePressed('ingredients')}>
                            Ingredients
                        </Buttonn>
                        {pressedd === 'instructions' && (
                            <div>
                                <p dangerouslySetInnerHTML={{ __html: foodDetails.summary}}></p>
                                <p dangerouslySetInnerHTML={{ __html: foodDetails.instructions}}></p>
                            </div>)
                        }
                        
                        {pressedd === 'ingredients' && (
                            <ul>
                                {foodDetails.extendedIngredients.map((ig) => (
                                <li key={ig.id}>{ig.original}</li>))}
                            </ul>)
                        }
                    </Info>
                </Wrapper>
                <CommentSection param={parameter.paramname} />
                <Footer />
            </div>
            );
}

const Wrapper = styled.div`
    padding-top: 5rem;
    margin-bottom: 5rem;
    display: grid;
    grid-template-columns: 23rem 1fr;
    margin: 0% 20%;

    h2{
        margin-bottom: 2rem;
    }

    img {
        border-radius: 2rem;
        left: 0;
        height: 300px;
        width: 400px;
        object-fit: cover;
    }

    .active {
        background: linear-gradient(35deg, #353535, #484848);
        color: white;
    }

    p {
        margin-top: 2rem;
    }
    
    li{
        line-height: 2.5rem;
    }

    ul {
        margin-top: 2rem;
    }
`;

const Buttonn = styled.button`
    padding: 1rem 2rem;
    color: #484848;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`;
const Info = styled.div`
    margin-left: 5rem;
`;


export default FoodRecipe;