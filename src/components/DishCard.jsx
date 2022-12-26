import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiCookingPot } from "react-icons/gi";
import { GiForkKnifeSpoon } from "react-icons/gi";

function DishCard(props) {

    return (
        <div>
            <Card>
                <Link to={'/foodrecipe/' + props.id} style={{ textDecoration: 'none' }}>
                    <img src={props.image} alt="{props.title}" />
                </Link>
            </Card> 
            <div  style={{width: "80%", display: "inline-block", paddingTop:"13px"}}>
            <p>{props.title}</p>
            <StyledLeft>
                
                <GiCookingPot style={{ fontSize: "1.5em" }}/><p>{props.servings} servings</p>
                </StyledLeft>
                <StyledRight>
                    <GiForkKnifeSpoon style={{ fontSize: "1.5em" }}/>
                    <p>{props.ready} minutes</p>
                </StyledRight>
                
            </div>
            <div style={{width: "20%", display: "inline-block", float: "right", paddingTop:"10px"}}><StyledLink><p>GO</p></StyledLink></div>
            
            
        </div>
    );
  };

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
        min-height:300px;
        min-width:300px;
        object-fit: cover;
    }
`;

const StyledLeft = styled.div`
    width: 50%;
    display: inline-block;
`;

const StyledRight = styled.div`
    float: left;
    width: 50%;
    display: inline-block;
`;


const StyledLink = styled(Link)`
    float:left;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: linear-gradient(35deg, #101010, #202020);
    width: 3.5rem;
    height: 3.5rem;
    curson: pointer;
    transform: scale(0.8);
    text-decoration: none;

    p {
        color: white;
        font-weight: 600;
        font-size: 1rem;
        top:4px;
        z-index: 10;
    }

    :hover {
        background: lightgrey;
        p {
            color: black;
        }
    }
`;

 
export default DishCard;