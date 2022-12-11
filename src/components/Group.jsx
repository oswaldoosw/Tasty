import React from "react";
import { GiTacos, GiNoodles, GiSteak,  GiSushis } from 'react-icons/gi';
import styled from 'styled-components';
import { NavLink } from "react-router-dom"; 

function Group() {

    return (
        <List>
            <StyledLink 
                to={'/dishes/Mexican'}>
                <GiTacos />
                <h4>Mexican</h4>
            </StyledLink>
            <StyledLink 
                to={'/dishes/American'}>
                <GiSteak />
                <h4>American</h4>
            </StyledLink>
            <StyledLink 
                to={'/dishes/Chinese'}>
                <GiNoodles />
                <h4>Chinese</h4>
            </StyledLink>
            <StyledLink 
                to={'/dishes/Japanese'}>
                <GiSushis />
                <h4>Japanese</h4>
            </StyledLink>
        </List>
    )
}

const List = styled.div`
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
    margin-right: 1rem;
    margin-left:1rem;
    text-decoration: none;
    background: linear-gradient(35deg, #353535, #606060);
    width: 5rem;
    height: 5rem;
    curson: pointer;
    transform: scale(0.8);

    h4 {
        color:white;
        font-size: 0.8rem;
    }
    svg {
        color:white;
        font-size: 1.5rem;
    }

    &.active {
        background: linear-gradient(to right, #f27121, #e94057);
        h4 {
            color: white;
        }
        svg{
            color: white;
        }
    }

`;



export default Group;
