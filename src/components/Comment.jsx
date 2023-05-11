import React from "react";
import {TbDotsVertical} from "react-icons/tb";
import person from "../assets/person.jpg";
import styled from "styled-components";


function Comment(props) {
    const [showDots, updateShowDots] = React.useState("none");
    const [threeDotsClick, updateThreeDotsClick] = React.useState(false);
    
    function handleDelete(e) {
        e.preventDefault();
        fetch("https://tasty-backend.vercel.app/recipe/comment/delete", {
        method:"DELETE",
        crossDomain:"true",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow_Origin":"*",
        },
        body:JSON.stringify({
            postid: props.postId,
            _id: props._id,
            token: localStorage.getItem("token"),
        }),
        })
        .then((res) => res.json())
        .then((data) => {
            props.updateContent(data.data.comments.reverse());
        })
        
    }

    function checkDate(commentDate) {
        var cDate = new Date(commentDate);
        var seconds = Math.floor((new Date() - cDate) / 1000);
        // numbers taken from stackoverflow :D
        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes ago";
        }

        return Math.floor(seconds) + " seconds";
    }

    return (
        <CommentCard className="p-3" onMouseOver={(e) => {updateShowDots("block")}} onMouseOut={() => {updateShowDots("none")}}>
                    
                
            <div className="d-flex justify-content-between align-items-center">
                <div className="user d-flex  align-items-center">
                    <ProfileIcon><img src={person} alt="" /></ProfileIcon>
                    <span style={{ fontSize: "16px" }} className="font-weight-bold text-primary">{props.comment.user.name} </span>
                    <div style={{ height: "16px"}}>
                        <Time>&ensp;{checkDate(props.comment.dateCreated)}</Time>
                    </div>
                </div>
                {
                    threeDotsClick ? 
                        <Popup onClick={handleDelete} onMouseOut={() => updateThreeDotsClick(false)} size={20}>
                            Remove
                        </Popup>  
                        : 
                        <TbDotsVertical onClick={() => updateThreeDotsClick(true)} style={{display: showDots, cursor: "pointer"}} size={20}>
                        </TbDotsVertical>
                }
                          
            </div>
            <small className="font-weight-bold">{props.comment.content}</small>
        </CommentCard>)
}

const Popup = styled.div`
    cursor: pointer;
`;

const CommentCard = styled.div`
    border-bottom: 0.1px solid #999999;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 100%;
    
    small {
        word-wrap: break-word;
    }
`;

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

const Time = styled.span`
    font-size: 12px;
    color: #606060; 
    display: flex; 
    justify-content: center;
    align-items: center;
`;

export default Comment;