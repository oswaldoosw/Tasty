
import React from 'react';
import styled from 'styled-components';
import tasty from '../assets/tasty.jpg';
import { NavLink as Link } from 'react-router-dom';

function NavBar() {

  return (
    <Nav>
        <NavMenu>
            <NavLink to="/">
                <img src={tasty} alt="" />
            </NavLink>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/events' activeStyle>
            Events
          </NavLink>
        </NavMenu>
      </Nav>
  );
};

const Nav = styled.nav`
  background: linear-gradient(35deg, #101010, #202020);
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
  height: 100%;
  cursor: pointer;
  img {
    height: 40px;
  }
  &.active {
    color: #000000;
  }
`;

  
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
`;
  

export default NavBar;