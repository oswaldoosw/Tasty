import React from "react";
import styled from 'styled-components';

function Pagination(props) {
    const styled = {fontWeight: "900",
                    borderColor: "#101010",
                    background: "black",
                    color: "white"
                }

    let pages = [];
    for(var i = 1; i <= Math.ceil(props.totalPosts/props.postsPerPage); i++) {
        pages.push(i);
    }
    return (
        <StyledPages>
            {
                pages.map((page) => {
                    return <button style={page === props.currentPage ? styled : {}} onClick={() => props.updateCurrentPage(page)}>
                        {page}
                    </button>;
                })
            }
        </StyledPages>
    )
}

const StyledPages = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1rem;

    button {    
        width: 40px;
        height: 40px;
        font-family: inherit;
        font-weight: 600;
        font-size: 16px;
        margin: 0 10px;
        border-radius: 6px;
        cursor: pointer;
        background: transparent;
        color: black;
        border-color: black;
        margin-top:20px;
    }
}
`;


export default Pagination;