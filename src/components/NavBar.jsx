
import React from 'react';
import styled from 'styled-components';
import tasty from '../assets/tasty.jpg';
import person from "../assets/person.jpg";
import { NavLink as Link } from 'react-router-dom';

function NavBar(props) {
  const [logout, updateLogout] = React.useState(false); 

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
  return (
        <div>
          <NavLink to="/" style={{ left: "5rem" }}>
              <img src={tasty} alt="" />
          </NavLink>
          <Nav>
          {props.namee === "" ? 
            <NavLink to='/auth/signin'>
              Sign In
            </NavLink>
            : <>
            {logout ? 
              <NavLink onMouseOut={() => {updateLogout(false)}} onClick={handleLogout}>
                Sign Out
              </NavLink>
              :
              <StyledDiv>
              <ProfileName>{props.namee}</ProfileName>
              <ProfileIcon onMouseOver={() => {updateLogout(true)}}>
                <img src={person} alt="" />
              </ProfileIcon>
            </StyledDiv>
            }</>
          }
      </Nav>
      </div>
  );
};

const Nav = styled.nav`
  background: #202020;
  height: 55px;
  display: flex;
  justify-content: flex-end;
  padding-right: 5rem;
  z-index: 12;
`;
  
const NavLink = styled(Link)`
  color: white;
  height: 55px;
  display: flex;
  position: absolute;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  img {
    height: 40px;
  }
  :hover{
    color: lightgreen;
  }
`;

const StyledDiv = styled.div`
  display: flex;
`;

const ProfileName = styled.p`
  color: white;
  text-align: center;
  vertical-align: middle;
  line-height: 55px;
  padding-right: 0.5rem;
`;



const ProfileIcon = styled.div`
  border-radius: 50%;
  cursor: pointer;
  transform: scale(0.8);
  margin: 0px 0px 0px auto;
  
  img {
      border-radius: 50%;
      width: 3.5rem;
      height: 3.5rem;
  }
`;

export default NavBar;