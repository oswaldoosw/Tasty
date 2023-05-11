import React from "react";
import styled from "styled-components";

function Footer() {
    return (
        <Wrapper>
            <StyledParagraph style={{ fontWeight: "900", fontSize: "1.2rem", lineHeight: "1"}}>
                Credits
            </StyledParagraph>
            <StyledParagraph>
                Food recipes collected from the Spoonacular API
            </StyledParagraph>
            <StyledParagraph>
                React SVG loader component by React Spinners
            </StyledParagraph>
            <StyledParagraph>
                Icons taken from React Icons
            </StyledParagraph>
        </Wrapper>);
}

const Wrapper = styled.div`
    padding-top: 30px;
    padding-bottom: 10px;
`;

const StyledParagraph = styled.p`
    justify-content: center;
    display: flex;
    line-height: 0.7;
`;
export default Footer;