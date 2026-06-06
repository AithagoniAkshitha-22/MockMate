import React, { useState } from 'react'
import {Link} from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/pngwing3.png"

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DIV isOpen={isOpen}>
        <div className='logo-container'>
          <Link to={"/"} style={{ display: 'flex', alignItems: 'center' }} onClick={() => setIsOpen(false)}>
            <img className='logo' src={Logo} alt="logo" />
          </Link>
          <span className='brand-name'>MockMate</span>
        </div>
        <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <div className='bar'></div>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
        <div className={`links-container ${isOpen ? 'open' : ''}`}>
          <Link className='link' to={"/"} onClick={() => setIsOpen(false)}>Home</Link>
          <Link className='link' to={"/interviews"} onClick={() => setIsOpen(false)}>Interviews</Link>
          <Link className='link' to={"/about"} onClick={() => setIsOpen(false)}>About</Link>
          <Link className='link' to={"/contact"} onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
    </DIV>
  )
}

const DIV = styled.div<{ isOpen: boolean }>`
width:100%;
height: 90px;
display: flex;
justify-content: space-between;
align-items: center;
background-color: #ff4b91;
border-bottom: 3px solid #0ea5e9;
position: relative;
box-sizing: border-box;
padding: 0 50px;

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
}

.logo{
  width: 40px;
}

.logo-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.brand-name {
  color: white;
  font-weight: bold;
  font-size: 24px;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  width: 30px;
  height: 30px;
}

.bar {
  width: 22px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.hamburger.open .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.open .bar:nth-child(2) {
  opacity: 0;
}

.hamburger.open .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 768px) {
  height: 70px;
  padding: 0 20px;

  .logo-container {
    margin-left: 0;
    gap: 8px;
  }

  .brand-name {
    font-size: 20px;
  }

  .hamburger {
    display: flex;
    z-index: 101;
    margin-right: 0;
  }

  .links-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 67px; /* Matches bottom of mobile header (70px total minus 3px border-bottom for perfect overlay) */
    left: 0;
    width: 100%;
    background-color: #ff4b91;
    border-bottom: 3px solid #0ea5e9;
    z-index: 100;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    
    /* Sliding animation properties */
    max-height: 0;
    opacity: 0;
    padding: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                opacity 0.3s ease-in-out,
                padding 0.4s ease-in-out;
  }

  .links-container.open {
    max-height: 300px;
    opacity: 1;
    padding: 20px 0;
  }

  .link {
    margin: 0;
    font-size: 18px;
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }
  
  .link:hover {
    background-color: rgba(2, 132, 199, 0.2);
  }
}
`;
