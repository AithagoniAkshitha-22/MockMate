import React from 'react'
import {Link} from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/pngwing3.png"

export const NavBar = () => {
  return (
    <DIV>
        <div className='logo-container'>
          <Link to={"/"} style={{ display: 'flex', alignItems: 'center' }}>
            <img className='logo' src={Logo} alt="logo" />
          </Link>
          <span className='brand-name'>MockMate</span>
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
  gap: 12px;
}

.brand-name {
  color: white;
  font-weight: bold;
  font-size: 24px;
}

@media (max-width: 768px) {
  flex-direction: column;
  height: auto;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 15px 10px;

  .logo-container {
    margin-left: 0;
    gap: 8px;
  }

  .brand-name {
    font-size: 20px;
  }

  .links-container {
    margin-right: 0;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .link {
    margin: 0 10px;
  }
}
`;
