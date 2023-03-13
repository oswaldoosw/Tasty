import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DishCard from "../components/DishCard.jsx";
import Footer from "../components/Footer";
import RingLoader from "react-spinners/RingLoader";

function Searched() {
    const [searchData, updateSearch] = useState([]);
    const [loader, updateLoader] = React.useState(false);
    let parameter = useParams();

    const style = {
        position: "absolute",
        top:'0',
        bottom: '0',
        left: '0',
        right: '0',
        margin: 'auto',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    function createSearchedDishes(recipe) {
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

    const getSearched = async (searchName) => {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${searchName}`)
        const data = await api.json();
        let arr = []
        for (let i = 0; i < data.number; i++) {
            const hello = await fetch (`https://api.spoonacular.com/recipes/${data.results[i].id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
            const dat = await hello.json();
            arr.push(dat);
            console.log(dat);
        } 

        updateSearch(arr);
    }
    
    useEffect(() => {
        updateLoader(true);
        async function someFunc() {
            await getSearched(parameter.paramsearch);
            updateLoader(false);
        }
        someFunc();

    },[parameter]);

    return (
        <div style={{margin: "0% 20%" }}>
            {loader ? 
                <div>
                    <LoadingH1>Finding Recipes...</LoadingH1>
                    <div style={style}>
                        <RingLoader
                            color={'#000000'}
                            loading={loader}
                            size={120}
                        />
                    </div>
                </div>
                :
                <div>
                    <StyledH1>Showing '{parameter.paramsearch}' Related Recipes</StyledH1>
                    <Grid>
                        {searchData.map(createSearchedDishes)}
                    </Grid>
                    <Footer />
                </div>
            }
        </div>
    );
}

const LoadingH1 = styled.h1`
    text-align: center;
    font-size: 38px;
    padding-top: 7rem;
    padding-bottom: 1rem;
    color: #494949;
`;

const StyledH1 = styled.h1`
    text-align: center;
    font-size: 38px;
    padding-top: 5rem;
    padding-bottom: 3rem;
    color: #303030;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 1rem 3rem;

    p {
        position: relative;
        z-index: 10;
        font-weight: 600;
        font-size: 1rem;
    }
`;

export default Searched;