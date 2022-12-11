import { useState } from "react";
import { FaSearch } from "react-icons/fa";
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
            <SearchStyle onSubmit={submitForm}>
                <FaSearch></FaSearch>
                <input 
                    onChange={handleChange}
                    type="text"
                    value={input}
                />
            </SearchStyle>
        </div>
    )
}

const SearchStyle = styled.form`
    margin: 0rem auto;
    position: relative;
    width: 50%;
    input{
        border:none;
        background: linear-gradient(35deg, #353535, #484848);
        font-size: 1.5rem;
        color:white;
        padding: 1rem 3rem;
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
        color: white;
    }

`

export default SearchBar;