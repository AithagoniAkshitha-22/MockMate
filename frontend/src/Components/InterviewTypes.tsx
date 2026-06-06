import { Link } from "react-router-dom";
import styled from "styled-components";

export const InterviewTypes = () => {
  return (
    <Container>
      <Card>
        <Title>MERN</Title>
        <Description>
          A MERN (MongoDB, Express.js, React, Node.js) interview assesses a
          candidate's expertise in full-stack web development. It evaluates
          their ability to build robust and efficient web applications using
          MongoDB for data storage, Express.js and Node.js for server-side
          logic, and React for creating dynamic user interfaces. The interview
          focuses on coding skills, architecture, and best practices to gauge a
          candidate's readiness for MERN stack development roles.
        </Description>
        <Link style={{textDecoration : "none"}} to={"/interview/mern?techStack=mern"}>
          <StartButton>Start Interview</StartButton>
        </Link>
      </Card>

      <Card>
        <Title>Node.js</Title>
        <Description>
          A Node.js interview evaluates a candidate's proficiency in server-side
          JavaScript development. It assesses their knowledge of Node.js
          runtime, asynchronous programming, event-driven architecture, and the
          ability to build scalable and efficient web applications and APIs.
          Candidates are typically asked to demonstrate their coding skills,
          handle asynchronous operations, and troubleshoot common Node.js
          issues, making them suitable for backend development roles in web and
          application development.
        </Description>
        <Link style={{textDecoration : "none"}} to={"/interview/node?techStack=node"}>
          <StartButton>Start Interview</StartButton>
        </Link>
      </Card>

      <Card>
        <Title>Java</Title>
        <Description>
          A Java interview assesses a candidate's expertise in the Java
          programming language. It evaluates their knowledge of core Java
          concepts, object-oriented programming principles, data structures, and
          algorithms. Candidates are typically asked to demonstrate their coding
          skills, problem-solving abilities, and familiarity with Java libraries
          and frameworks. These interviews are common for various software
          development roles, including backend development, Android app
          development, and enterprise-level application development.
        </Description>
        <Link style={{textDecoration : "none"}} to={"/interview/java?techStack=java"}>
          <StartButton>Start Interview</StartButton>
        </Link>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin: 40px auto;
  padding: 40px;
  max-width: 1200px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(14, 165, 233, 0.2);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(14, 165, 233, 0.15);
    border-color: rgba(255, 75, 145, 0.3);
  }
`;

const Title = styled.h1`
  text-align: justify;
  font-weight: bold;
  font-size: 32px;
  margin-top: 0;
  color: #0284c7;
  border-bottom: 3px solid #ff4b91;
  padding-bottom: 8px;
  display: inline-block;
  width: fit-content;
`;

const Description = styled.p`
  text-align: justify;
  color: #4b5563;
  line-height: 1.6;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const StartButton = styled.button`
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 10px auto 0;
  background: linear-gradient(90deg, #ff4b91 0%, #0ea5e9 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 75, 145, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #0ea5e9 0%, #ff4b91 100%);
    box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
    transform: scale(1.03);
  }
`;
