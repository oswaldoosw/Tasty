import React from "react";
import styled from "styled-components";

function Footer() {

    return (
        <div style={{paddingTop: "30px", paddingBottom: "10px",}}>
            <StyledParagraph style={{ fontWeight: "900", fontSize: "1.2rem", lineHeight: "1"}}>
                Credits
            </StyledParagraph>
            <StyledParagraph>
                Food recipes collected from the Spoonacular API
            </StyledParagraph>
            <StyledParagraph>
                Icons taken from React Icons
            </StyledParagraph>
        </div>);
}

const StyledParagraph = styled.p`
    justify-content: center;
    display: flex;
    line-height: 0.7;
`;
export default Footer;