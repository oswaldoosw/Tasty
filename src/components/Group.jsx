import React from "react";
import styled from 'styled-components';
import { NavLink } from "react-router-dom"; 
import borgar from "../assets/borgar.jpeg";
import tacos from "../assets/tacos.jpg";
import noodles from "../assets/noodles.jpg";
import sushi from "../assets/sushi.jpg";

function Group() {

    return (
        <List>
            <StyledLink 
                to={'/dishes/Mexican'}>
                <img src={tacos} alt=""/>
                <p>Mexican</p>
            </StyledLink>
            <StyledLink 
                to={'/dishes/American'}>
                <img src={borgar} alt=""/>
                <p>American</p>
            </StyledLink>
            <StyledLink 
                to={'/dishes/Chinese'}>
                <img src={noodles} alt=""/>
                <p>Chinese</p>
            </StyledLink>
            <StyledLink 
                to={'/dishes/Japanese'}>
                <img src={sushi} alt=""/>
                <p>Japanese</p>
            </StyledLink>
        </List>
    )
}

const List = styled.div`
    padding-top: 1rem;
    display: flex;
    justify-content: center;
    margin: 0 auto;


`;

const StyledLink = styled(NavLink)`
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    text-decoration: none;
    background: linear-gradient(35deg, #353535, #606060);
    width: 10rem;
    height: 10rem;
    curson: pointer;
    transform: scale(0.8);

    :hover{
        img{
            filter: sepia(10%);
        }
    }
    
    img {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 10rem;
        height: 10rem;
        curson: pointer;
        filter: brightness(70%);
    }

    p {
        position: absolute;
        z-index: 10;
        bottom: 0%
        transform: translate(-50%, 0%);
        color: white;
        font-weight: 600;
        font-size: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    
    &.active {
        img{
            filter: sepia(10%);
        }
    }

`;



export default Group;
