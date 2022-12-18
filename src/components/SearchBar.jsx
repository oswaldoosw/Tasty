import { useState } from "react";
import { GoSearch } from "react-icons/go";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
function SearchBar() {
    const [input, updateInput] = useState("");
    const nav = useNavigate();

    function handleChange(event) {
        updateInput(event.target.value);
    } 

    function submitForm(event) {
        event.preventDefault();
        nav('/searched/' + input)
    } 

    return (
        <div>
            <StyledH1>Search for a recipe here!</StyledH1>
            <SearchStyle onSubmit={submitForm}>
                <GoSearch />
                <input 
                    onChange={handleChange}
                    type="text"
                    value={input}
                />
            </SearchStyle>
        </div>
    )
}

const StyledH1 = styled.h1`
    text-align: center;
    font-size: 30px;
    padding-bottom: 1rem;
`;

const SearchStyle = styled.form`
    margin: 0rem auto;
    position: relative;
    width: 50%;
    
    input{
        border:none;
        background: white;
        font-size: 1.5rem;
        color:black;
        padding: 1rem 3rem;
        box-shadow: 1px 1px 20px 6px #dcdcdc;
        border: none;
        border-radius: 1rem;
        outline: none;
        width:100%;
    }
    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
    }
`;

export default SearchBar;