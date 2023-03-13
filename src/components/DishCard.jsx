import React, { useEffect } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiCookingPot } from "react-icons/gi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { FaStar } from "react-icons/fa";

function DishCard(props) {
    
    const [rating, updateRating] = React.useState(0);
    const [ratingCount, updateRatingCount] = React.useState(0);
    useEffect(() => {
        const fetchRating = async () => {
            fetch(`http://localhost:5000/recipe/?param=${props.id}`, {
                method:"GET",
                crossDomain:"true",
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/json",
                    "Access-Control-Allow_Origin":"*",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                updateRating(data.data.rating.score);
                updateRatingCount(data.data.rating.count);
            })
        }
        fetchRating();
    },[props.id]);


    return (
        <div>
            <Card>
                <Link to={'/foodrecipe/' + props.id} style={{ textDecoration: 'none' }}>
                    <img src={props.image} alt="{props.title}" />
                </Link>
            </Card> 
            <div style={{width: "80%", display: "inline-block", paddingTop:"13px"}}>
                <div style={{ fontWeight: "700", paddingBottom: "5px" }}>
                    {props.title}
                </div>
                <div>
                {[...Array(5)].map((star, index) => {
                    const starValue = index + 1;
                    return (
                        <FaStar size={20} color={rating >= starValue ? "yellow" : "lightgray"} style={{ cursor: "pointer", }} />
                    );
                })}
                <sub>&ensp;<b>{Math.round(rating * 10) / 10}/5</b> by {ratingCount} users</sub>
                </div>
                <div style= {{ paddingTop: "20px" }}>
                    <StyledLeft>
                        <GiCookingPot style={{ fontSize: "1.5em" }}/><p>{props.servings} servings</p>
                    </StyledLeft>
                    <StyledRight>
                        <GiForkKnifeSpoon style={{ fontSize: "1.5em" }}/>
                        <p>{props.ready} minutes</p>
                    </StyledRight>
                </div>
            </div>
            <div style={{width: "20%", display: "inline-block", float: "right", paddingTop:"10px"}}><StyledLink to={'/foodrecipe/' + props.id}><p>GO</p></StyledLink></div>
            {/* {content?.map((comment)=> {return (
                <div>{comment._id}</div>
                )
            })} */}
        </div>
    )
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
    float: left;
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
        top:7px;
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