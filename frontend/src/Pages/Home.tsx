import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import aiImage from "../assets/pngwing2.png";
import { Link, useSearchParams } from "react-router-dom";


export const Home = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [searchParams, setSearchParams] = useSearchParams();

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

  useEffect(() => {
    const scrollParam = searchParams.get("scroll");
    if (scrollParam === "about" || scrollParam === "contact") {
      const targetSec = document.getElementById(scrollParam);
      if (targetSec) {
        setTimeout(() => {
          targetSec.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <DIV>
        <div className="text">
          <h1>Have your <br />best <strong>Mock</strong> <br /> interview session</h1>
          <p>Ace Your Interviews with AI-Powered Practice Sessions.</p>
          <Link to={"/interviews"} style={{ textDecoration: 'none' }}>
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

      <AboutSection id="about">
        <AboutTitle>About MockMate</AboutTitle>
        <AboutSubtitle>
          Empowering candidates to conquer interview anxiety and excel in technical & behavioral evaluations.
        </AboutSubtitle>
        <CardsContainer>
          <AboutCard>
            <CardTitle>What is MockMate?</CardTitle>
            <CardDescription style={{ marginBottom: "15px", textAlign: "center" }}>
              Your ultimate AI-powered preparation ground for technical and behavioral interviews.
            </CardDescription>
            <FeatureList>
              <FeatureItem><strong>Role Alignment</strong>: Technical tracks tailored to MERN, Python, Java, SQL, and HR vetting.</FeatureItem>
              <FeatureItem><strong>Webcam Simulation</strong>: Immersive browser camera feed replicating real video calls.</FeatureItem>
              <FeatureItem><strong>Vocal Interaction</strong>: Integrated speech recognition for interactive speech practice.</FeatureItem>
              <FeatureItem><strong>Immediate Review</strong>: Instant grading rubrics with speech-synthesized playback.</FeatureItem>
            </FeatureList>
          </AboutCard>

          <AboutCard>
            <CardTitle>Core Features</CardTitle>
            <FeatureList>
              <FeatureItem><strong>Dynamic Simulator</strong>: Adaptation to specific dev stacks & professional roles.</FeatureItem>
              <FeatureItem><strong>Webcam Simulator</strong>: Realistic camera preview to replicate live interview environments.</FeatureItem>
              <FeatureItem><strong>Voice Interaction</strong>: Automated Speech-to-Text response captures.</FeatureItem>
              <FeatureItem><strong>AI Evaluation & Speech</strong>: Instant grading on subject matter and communication with synthesized audio feedback.</FeatureItem>
            </FeatureList>
          </AboutCard>

          <AboutCard>
            <CardTitle>How It Helps You</CardTitle>
            <FeatureList>
              <FeatureItem><strong>Build Confidence</strong>: Clear speech patterns and reduce anxiety through continuous practice.</FeatureItem>
              <FeatureItem><strong>Identify Gaps</strong>: Uncover vocabulary blindspots or weak technical explanations.</FeatureItem>
              <FeatureItem><strong>Tailored Tracking</strong>: Master key technologies with focused assessments built around standard questions.</FeatureItem>
            </FeatureList>
          </AboutCard>
        </CardsContainer>
      </AboutSection>

      <ContactSection id="contact">
        <ContactTitle>Contact Us</ContactTitle>
        <ContactSubtitle>
          Have any questions, concerns, or feedback? Drop us a message, and our team will get back to you!
        </ContactSubtitle>
        <ContactContainer>
          <ContactInfoCard>
            <CardTitle style={{ color: "#ff4b91" }}>Contact Info</CardTitle>
            <ContactInfoList>
              <ContactInfoItem>
                <strong>Email Us:</strong><br />
                <a href="mailto:support@mockmate.ai" style={{ color: "#ff4b91", textDecoration: "none" }}>support@mockmate.ai</a>
              </ContactInfoItem>
              <ContactInfoItem>
                <strong>Call Us:</strong><br />
                +1 (555) 019-2834
              </ContactInfoItem>
              <ContactInfoItem>
                <strong>Availability:</strong><br />
                Monday - Friday, 9:00 AM - 6:00 PM EST
              </ContactInfoItem>
              <ContactInfoItem>
                <strong>HQ Address:</strong><br />
                100 AI Innovation Boulevard, Suite 500, Tech City, NY 10001
              </ContactInfoItem>
            </ContactInfoList>
          </ContactInfoCard>

          <ContactFormCard onSubmit={(e: React.FormEvent) => { e.preventDefault(); alert("Thank you for reaching out! We'll get back to you soon."); }}>
            <CardTitle>Send a Message</CardTitle>
            <FormGroup>
              <InputLabel htmlFor="name">Full Name</InputLabel>
              <FormInput id="name" type="text" placeholder="Enter your name" required />
            </FormGroup>
            <FormGroup>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <FormInput id="email" type="email" placeholder="Enter your email" required />
            </FormGroup>
            <FormGroup>
              <InputLabel htmlFor="message">Your Message</InputLabel>
              <FormTextArea id="message" rows={4} placeholder="Type your message here..." required />
            </FormGroup>
            <SubmitBtn type="submit">Submit Message</SubmitBtn>
          </ContactFormCard>
        </ContactContainer>
      </ContactSection>
    </>
  );
};

const DIV = styled.div`
  width: 100%;
  min-height: calc(100vh - 90px);
  box-sizing: border-box;
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
    height: calc(100vh - 70px);
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    gap: 20px;
    
    h1 {
      font-size: 28px;
      line-height: 1.2;
      margin-block-start: 10px;
      margin-block-end: 10px;
    }

    button {
      width: 100%;
      max-width: 220px;
      font-size: 20px;
      padding: 12px;
      margin: 15px auto 0;
      display: block;
    }

    .text {
      margin-top: 5px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .image {
      width: 100%;
      max-width: 250px;
      max-height: 25vh;
      object-fit: contain;
    }
  }
`;

const AboutSection = styled.section`
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  color: #1e3a8a;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  min-height: calc(100vh - 90px);
  justify-content: center;

  @media (max-width: 768px) {
    min-height: calc(100vh - 70px);
    padding: 60px 15px;
  }
`;

const AboutTitle = styled.h2`
  font-size: 38px;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 15px;
  color: #0369a1;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #ff4b91;
    margin: 12px auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const AboutSubtitle = styled.p`
  font-size: 18px;
  color: #0369a1;
  max-width: 800px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 40px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 0 10px;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  width: 100%;
  margin-top: 20px;
  box-sizing: border-box;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

const AboutCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(3, 105, 161, 0.08);
  border: 1px solid rgba(14, 165, 233, 0.2);
  padding: 35px 25px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(3, 105, 161, 0.15);
    border-color: rgba(255, 75, 145, 0.4);
  }
`;

const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 20px;
  color: #0ea5e9;
`;

const CardDescription = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
  text-align: justify;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  width: 100%;
`;

const FeatureItem = styled.li`
  font-size: 14px;
  line-height: 1.5;
  color: #4b5563;
  margin-bottom: 12px;
  position: relative;
  padding-left: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #ff4b91;
    font-weight: bold;
  }
`;

const ContactSection = styled.section`
  background: linear-gradient(135deg, #bae6fd 0%, #e0f2fe 100%);
  color: #1e3a8a;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  min-height: calc(100vh - 90px);
  justify-content: center;

  @media (max-width: 768px) {
    min-height: calc(100vh - 70px);
    padding: 60px 15px;
  }
`;

const ContactTitle = styled.h2`
  font-size: 38px;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 15px;
  color: #0369a1;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #ff4b91;
    margin: 12px auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const ContactSubtitle = styled.p`
  font-size: 18px;
  color: #0369a1;
  max-width: 800px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 40px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 0 10px;
  }
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
  max-width: 1100px;
  width: 100%;
  margin-top: 20px;
  box-sizing: border-box;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 20px;
  }
`;

const ContactInfoCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(3, 105, 161, 0.08);
  border: 1px solid rgba(14, 165, 233, 0.2);
  padding: 40px 35px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(3, 105, 161, 0.12);
  }
`;

const ContactFormCard = styled.form`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(3, 105, 161, 0.08);
  border: 1px solid rgba(14, 165, 233, 0.2);
  padding: 40px 35px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(3, 105, 161, 0.12);
  }
`;

const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 10px;
`;

const ContactInfoItem = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: #4b5563;
  
  strong {
    color: #1e3a8a;
    font-size: 16px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  width: 100%;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #1e3a8a;
`;

const FormInput = styled.input`
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(14, 165, 233, 0.3);
  font-size: 15px;
  width: 100%;
  box-sizing: border-box;
  color: #1f2937;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff4b91;
    box-shadow: 0 0 0 3px rgba(255, 75, 145, 0.15);
  }
`;

const FormTextArea = styled.textarea`
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(14, 165, 233, 0.3);
  font-size: 15px;
  width: 100%;
  box-sizing: border-box;
  color: #1f2937;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff4b91;
    box-shadow: 0 0 0 3px rgba(255, 75, 145, 0.15);
  }
`;

const SubmitBtn = styled.button`
  background: linear-gradient(90deg, #ff4b91 0%, #ff80b5 100%);
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 14px;
  border-radius: 12px;
  border: none;
  box-shadow: 0px 4px 15px rgba(255, 75, 145, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  
  &:hover {
    background: linear-gradient(90deg, #0ea5e9 0%, #38bdf8 100%);
    box-shadow: 0px 4px 15px rgba(14, 165, 233, 0.3);
    transform: translateY(-2px);
  }
`;
