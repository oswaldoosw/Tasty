import React, { useEffect } from "react";
import styled from "styled-components";
import DishCard from "../components/DishCard.jsx"
import { useParams } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

function Dishes() {

    const [dishes, updateDishes] = React.useState([]);
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

    function createDish(dish) {
        return (
            // <Card key={dish.id}>
            //     <Link to={"/foodrecipe/" + dish.id}>
            //         <img src={dish.image} alt="" />
            //         <h4>{dish.title}</h4>
            //     </Link>
            // </Card>
            <DishCard 
                id={dish.id}
                title={dish.title} 
                servings={dish.servings} 
                image={dish.image} 
                ready={dish.readyInMinutes}   
            
            />
        )
    }

    useEffect(() => {
        updateLoader(true);
        getDishes(parameter.paramtype);
        async function someFunc() {
            await getDishes(parameter.paramtype);
            updateLoader(false);
        }
        someFunc();
        
    },[parameter]);

    const getDishes = async (dishName) => {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${dishName}`)
        const data = await api.json();
        console.log(data + "he")
        let arr = []
        for (let i = 0; i < data.number; i++) {
            const hello = await fetch (`https://api.spoonacular.com/recipes/${data.results[i].id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
            const dat = await hello.json();
            arr.push(dat);
            console.log(dat);
        } 
        console.log(arr);
        
        updateDishes(arr);
    }
    return (
        <div>
            
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
                <StyledH1>Showing '{parameter.paramtype}' Cuisines</StyledH1>
                <Grid>
                    {dishes.map(createDish)}
                </Grid>
            </div>
        }
        </div>
        
    );
}

const LoadingH1 = styled.h1`
    text-align: center;
    font-size: 38px;
    padding-top: 3rem;
    padding-bottom: 1rem;
    color: #494949;
`;

const StyledH1 = styled.h1`
    text-align: center;
    font-size: 38px;
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


export default Dishes;