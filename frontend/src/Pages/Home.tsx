import React, { useState } from 'react';
import styled from 'styled-components';
// import aiImage from "../assets/intervuew2.jpg";
import aiImage from "../assets/pngwing2.png";
import {Link} from "react-router-dom";


export const Home = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Increase rotation limit to 40 degrees for higher bounce/rotate effect
    const factorX = (x / (box.width / 2)) * 40;
    const factorY = (y / (box.height / 2)) * -40;
    setCoords({ x: factorX, y: factorY });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <>
    <DIV>
      <div className="text">
        <h1>Have your <br />best <strong>Mock</strong> <br /> interview session</h1>
        <p>Ace Your Interviews with AI-Powered Practice Sessions.</p>
        <Link to={"/interviews"}>
           <button>Try it Free</button>
        </Link>
      </div>
      <div 
        className="image-container-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="image-card"
          style={{
            transform: `rotateX(${coords.y}deg) rotateY(${coords.x}deg) scale(1.08)`
          }}
        >
          <img src={aiImage} alt="Robot mascot" className="image" />
        </div>
      </div>
     
    </DIV>
     </>
  );
};

const DIV = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #0ea5e9 100%);
  display: flex;
  margin-top: 0px;
  padding-top: 130px;
  padding-bottom: 130px;
  color: white;
  justify-content: space-evenly;

h1{
  font-size:47px;
}
  .text {
    margin-top:2px;
    text-align: left;
  }

  .image-container-3d {
    perspective: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-card {
    transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.45);
    transform-style: preserve-3d;
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.4));
    animation: floatMascot 3.5s ease-in-out infinite;
  }

  .image {
    width: 400px;
    height: auto;
    pointer-events: none;
  }

  @keyframes floatMascot {
    0%, 100% {
      transform: translateY(0) rotate(-4deg);
      filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.35));
    }
    50% {
      transform: translateY(-28px) rotate(4deg);
      filter: drop-shadow(0 38px 35px rgba(0, 0, 0, 0.2));
    }
  }
  
  button {
    width: 55%;
    margin-top:30px;
    background: linear-gradient(90deg, #ff4b91 0%, #ff80b5 100%);
    color: white;
    font-size: 25px;
    font-weight: bold;
    padding: 16px;
    border-radius: 20px;
    border: none;
    box-shadow: 0px 4px 15px rgba(255, 75, 145, 0.4);
    transition: all 0.3s ease;
  }

  button:hover {
    background: linear-gradient(90deg, #0ea5e9 0%, #38bdf8 100%);
    color: white;
    box-shadow: 0px 4px 15px rgba(14, 165, 233, 0.4);
    transform: translateY(-2px);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    padding-top: 40px;
    padding-bottom: 60px;
    width:100%;
    display: flex;
    flex-direction:column;
    padding-left:20px;
    padding-right:20px;
    
    button {
      width: 50%;
      font-size: 20px;
      padding: 12px;
      margin:20px;
    }
    .text {
      margin-top:5px;
    }
  }
`;
