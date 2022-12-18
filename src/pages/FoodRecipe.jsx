import styled from "styled-components";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

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

    return (<Wrapper>
                <div>
                <h2>{foodDetails.title}</h2>
                <img src={foodDetails.image} alt=""/>
                </div>
                <Info>
                    <Buttonn className={pressedd === 'instructions' ? "active" : ''} onClick={() => updatePressed('instructions')}>Instructions</Buttonn>
                    <Buttonn className={pressedd === 'ingredients' ? "active" : ''} onClick={() => updatePressed('ingredients')}>Ingredients</Buttonn>
                    {pressedd === 'instructions' && (
                        <div>
                            <h3 dangerouslySetInnerHTML={{ __html: foodDetails.summary}}></h3>
                            <h3 dangerouslySetInnerHTML={{ __html: foodDetails.instructions}}></h3>
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
            );
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
    margin-left: 10rem;
`;


export default FoodRecipe;