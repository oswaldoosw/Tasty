import React, { useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Rating = ((props) => {

    const [rating, updateRating] = React.useState(null);
    const [showRating, updateShowRating] = React.useState(false);
    const [postId, updatePostId] = React.useState();
    const [initialRating, updateIntitialRating] = React.useState(0);

    const firstUpdate = useRef(true);
    const [userFirstTimeRating, updateFirstTimeRating] = React.useState(true);

    const [actualRating, updateActualRating] = React.useState(0);
    const [ratingCount, updateRatingCount] = React.useState(0);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkRecipeDetails = async () => {
            fetch(`http://localhost:5000/rating/?token=${token}&param=${props.param}`, {
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
                updatePostId(data.data._id);
                updateActualRating(data.data.rating.score);
                updateRatingCount(data.data.rating.count);
                if (data.status === "rating found")
                {
                    updateIntitialRating(data.rating.ratingList[0].score);
                    updateRating(data.rating.ratingList[0].score);
                    updateFirstTimeRating(false);
                }
                
               
            })
        }
        checkRecipeDetails();
    }, [props.param, token])

    useLayoutEffect(() => {
        console.log(showRating, "dadaad");
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        else if (showRating) {
            const submitRating = async () => {
                fetch("http://localhost:5000/recipe/rate", {
                method:"PATCH",
                crossDomain:"true",
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/json",
                    "Access-Control-Allow_Origin":"*",
                },
                body:JSON.stringify({
                    postid: postId,
                    token: localStorage.getItem("token"),
                    rating: rating,
                    actualRating: actualRating,
                    ratingCount: ratingCount,
                    firstTimeRating: userFirstTimeRating,
                    initialRating: initialRating,
                }),
                })
                .then((res) => res.json())
                .then((data) => {
                    updateFirstTimeRating(false);
                    updateIntitialRating(rating);
                    updateActualRating(data.data.rating.score);
                    updateRatingCount(data.data.rating.count);
                })
            }
            submitRating();
        }
    }, [rating, actualRating, initialRating, postId, ratingCount, showRating, userFirstTimeRating]);


    const handleRating = async (e) => {
        if (localStorage.getItem("token") === null) {
            alert("You need to be logged in first before rating");
            return;
        }
        updateRating(e.target.value);
        updateShowRating(true);
    }

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const starValue = index + 1;
                return (
                    <label>
                        <StyledRadio value={starValue} onClick={handleRating} type="radio" name="rating" />
                        <FaStar size={40} color={rating >= starValue ? "yellow" : "lightgray"} style={{ cursor: "pointer", }} />
                    </label>
                );
            })}
            
            <sub style={{ fontSize: "30px", }}>&ensp;{rating}{rating === null ? "" : "/5"}</sub>
            <p style={{ fontSize: "12px", }}>This recipe is rated <b>{actualRating}/5 stars</b> by a total of {ratingCount} users</p>
        </div>
    )
})

const StyledRadio = styled.input`
    display: none;
`;

export default Rating;