import React, { useEffect } from 'react';
import styled from "styled-components";
import person from "../assets/person.jpg";
import Comment from "../components/Comment";
import Pagination from "../components/Pagination";


function CommentSection(props) {
    const [comment, updateComment] = React.useState("");
    const [content, updateContent] = React.useState([]);
    const [postId, updatePostId] = React.useState();

    const [currentPage, updateCurrentPage] = React.useState(1);
    
    const postsPerPage = 5;

    

    useEffect(() => {
        const checkRecipeDetails = async () => {
            fetch(`https://tasty-backend.vercel.app/recipe/?param=${props.param}`, {
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
                updateContent(data.data.comments.reverse());
            })
        }
        checkRecipeDetails();
    }, [props.param])

    

    function handleSubmit(e) {
        e.preventDefault();
        if (localStorage.getItem("token") === null)
        {
            alert("You need to be logged in first before commenting");
        }
        else if (comment.length < 5)
        {
            alert("Comment must be longer than 5 characters");
        }
        else {
            fetch("https://tasty-backend.vercel.app/recipe/comment", {
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
                content: comment,
            }),
            })
            .then((res) => res.json())
            .then((data) => {
                updateContent(data.data.comments.reverse());
                updateComment("");
                updateCurrentPage(1);
            })
        }
        
    }


    const lastPost = currentPage * postsPerPage;
    const firstPost = lastPost - postsPerPage;
    const currentPosts = content.slice(firstPost, lastPost);

    return (
        <StyledDiv style={{margin: "0% 20%"}}>
            <form onSubmit={handleSubmit} style={{ paddingBottom: "20px"}}>
                <h3 style={{ paddingBottom: "20px"}}>Leave a Comment</h3>
                    <ProfileIcon><img style={{width: "4rem", height: "4rem"}} src={person} alt="" /></ProfileIcon>
                    <StyledInput type="text" value={comment} onChange={(e) => {updateComment(e.target.value)}}></StyledInput>
                <div style={{paddingTop:"10px", float: "right"}}>
                    <SubmitButton>Submit</SubmitButton>
                </div>
            </form>
            {currentPosts?.map((comment)=> {return (
                <Comment 
                    key={comment._id}
                    comment={comment} 
                    postId={postId} 
                    _id={comment._id} 
                    updateContent={updateContent}
                />)
                
            })}
            <Pagination 
                totalPosts={content.length} 
                postsPerPage={postsPerPage} 
                updateCurrentPage={updateCurrentPage} 
                currentPage={currentPage}  
            />
            
        </StyledDiv>
    );
  };

  const ProfileIcon = styled.div`
  border-radius: 50%;
  transform: scale(0.8);
  margin: 0px 0px 0px auto;
  float: left;
  

  img {
      border: 3px solid lightgray;
      border-radius: 50%;
      width: 3.5rem;
      height: 3.5rem;
  }
`;



const StyledDiv = styled.div`
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;

`;

const StyledInput = styled.input`
    background: white;
    color:black;
    padding: 1rem;
    border:none;
    border-bottom: 1px solid black;
    outline: none;
    width:80%;

`;

const SubmitButton = styled.button`
    padding: 0.7rem;
    border: 0;
    color: white;
    background: blue;
    font-weight: 600;
    float:right;
    display: flex;
    align-items: center; 
    justify-content: center;
`;



export default CommentSection;