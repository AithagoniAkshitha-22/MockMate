import React from 'react'
import {Link} from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/pngwing3.png"

export const NavBar = () => {
  return (
    <DIV>
        <div className='logo-container'>
        <Link className='link' to={"/"}>
          <img className='logo' src={Logo} alt="logo" />
        </Link>
          MockMate
        </div>
        <div className='links-container'>
          <Link className='link' to={"/"}>Home</Link>
          <Link className='link' to={"/interviews"}>Interviews</Link>
          <Link className='link' to={"/about"}>About</Link>
          <Link className='link' to={"/contact"}>Contact</Link>
        </div>
    </DIV>
  )
}

const DIV = styled.div`
width:100%;
height: 40px;
display: flex;
justify-content: space-between;
padding-top: 20px;
padding-bottom:20px;
background-color: #ff4b91;
border-bottom: 3px solid #0ea5e9;

.link {
  margin: 0 20px;
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.link:hover {
  color: #0284c7;
}

.links-container{
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.logo{
  width: 40px;
}

.logo-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
  font-weight: bold;
  color: #0284c7;
}

@media (max-width: 768px) {
  display: flex;
  justify-content: space-around;
  width:100%;
  padding: 15px 20px;
}
`;
