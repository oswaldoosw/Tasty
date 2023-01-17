import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from 'react';

function Comments(props) {
    const [comment, updateComment] = React.useState("");
    const [recipeId, updateRecipeId] = React.useState();
    const [content, updateContent] = React.useState([]);
    const [postId, updatePostId] = React.useState();

    useEffect(() => {
        const checkRecipeDetails = async () => {
            fetch("http://localhost:5000/checkrecipe", {
                method:"POST",
                crossDomain:"true",
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/json",
                    "Access-Control-Allow_Origin":"*",
                },
                body:JSON.stringify({
                    recipeid: props.param,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "CheckRecipe");
                updatePostId(data.data._id);
                {data.data.comments.map((details) => {
                    updateContent((prevItems) => {return [...prevItems, details];})
                })}
                updateRecipeId(data.data.recipeId);
            })
        }
        
        checkRecipeDetails();
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:5000/submitcomment", {
            method:"PUT",
            crossDomain:"true",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow_Origin":"*",
            },
            body:JSON.stringify({
                postid: postId,
                token: localStorage.getItem("token"),
                content: comment,
                recipeid: recipeId,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "CommentSubmit");
            updateContent([]);
            console.log(data.data.comments[0].user.name, "CommentSubmit");
            console.log(data.data.comments[0].dateCreated, "hau");
            {data.data.comments.map((comment) => {
                updateContent((prevItems) => {return [...prevItems, comment];})
            })}
        })
    }
    return (
        <div style={{margin: "0% 20%"}}>
            <form onSubmit={handleSubmit}>
                <h2>Leave a Comment!</h2>
                <input type="text" onChange={(e) => {updateComment(e.target.value)}}></input>
                <button>Submit</button>
            </form>
            {content?.map((test)=> {return <div>{test.user.name} {test.content} {test.dateCreated}</div>})}
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

export default Comments;