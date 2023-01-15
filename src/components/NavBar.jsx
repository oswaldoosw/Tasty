
import React from 'react';
import styled from 'styled-components';
import tasty from '../assets/tasty.jpg';
import { NavLink as Link } from 'react-router-dom';

function NavBar(props) {

  return (
    <Nav>
        <NavMenu>
            <NavLink to="/" >
                <img src={tasty} alt="" />
            </NavLink>
          {props.namee === "" ? 
          <NavLink to='/auth/signin' style={{position:"absolute", paddingLeft: "85%"}}>
            Sign In
          </NavLink>
          :
          <div>hello</div>
          }
          
        </NavMenu>
      </Nav>
  );
};

const Nav = styled.nav`
  background: #202020;
  height: 55px;
  display: flex;
  justify-content: space-between;
  padding-left: 5rem;
  z-index: 12;
`;
  
const NavLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  img {
    height: 40px;
  }
  :hover{
    color: lightgreen;
  }
`;

  
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
`;
  

export default NavBar;