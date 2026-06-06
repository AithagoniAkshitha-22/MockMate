import React, { useEffect } from "react";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import styled from "styled-components";
import Webcam from "react-webcam";
import { MdCopyAll } from "react-icons/md";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Loader } from "./Loader ";

type Array = {
  question: string;
  techStack: string;
};

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

export const Interview = () => {
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
  const [text, setText] = useState("");
  const [isCopied, setCopied] = useClipboard(text);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFeed, setShowFeed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const techStack = searchParams.get("tectStack");
  const [questions, setQuestions] = useState<Array[]>([]);
  const [render, setRender] = useState<boolean>(false);
  const [feedBack, setFeedBack] = useState<string>("");

  const start = () => {
    alert("Interview Started");
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const handleClear = () => {
    resetTranscript();
  };

  const handleTurnoff = () => {
    SpeechRecognition.abortListening();
  };

  const handleNextQuestion = () => {
    setShowFeed(false);
    resetTranscript();
    setCurrentIndex((prev) => (prev === questions?.length - 1 ? 0 : prev + 1));
    // SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    window.speechSynthesis.cancel();
  };

  const handleprevious = () => {
    setShowFeed(false);
    // SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    setRender(true);
    axios
      .get(`${BASE_URL}/questions/get?techStack=${techStack}`)
      .then((res) => {
        // console.log(res.data);
        setQuestions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [techStack]);

  const handleSubmit = () => {
    setShowFeed(true);
    setIsLoading(true);
    SpeechRecognition.stopListening();

    let prompt = `Consider your self as a interviewer for full stack web developer. This is question :- ${questions[currentIndex].question} and this is my answer of this question :- ${transcript} give me feedback on this answer. The feedback should be evaluated using the following rubrics Feedback for Subject Matter Expertise and Communication skills should contain ratings on my interview responses from 0 - 10. Don't mention any where that you are an AI model just give feedback`;
    axios
      .get(`${BASE_URL}/bot/chat?prompt=${prompt}`)
      .then((res) => {
        setFeedBack(res.data);
        setIsLoading(false);
        const cleanSpeechText = res.data
          .replace(/#+/g, "")
          .replace(/\*/g, "")
          .replace(/-\s+/g, "")
          .replace(/\b(\d+)\/(\d+)\b/g, "$1 out of $2");
        const value = new SpeechSynthesisUtterance(cleanSpeechText);
        window.speechSynthesis.speak(value);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      {render && (
        <DIV>
          {showFeed ? (
            <div className="feedback-container">
              <div className="feedback">
                <div className="student-answer">
                  <h1 className="student-answer-heading">Your Answer</h1>
                  <p>{transcript}</p>
                </div>
                <div className="chat-feedback">
                  {isLoading === false && (
                    <p className="feedback-heading">Feedback</p>
                  )}
                  {isLoading ? (
                    <div className="loader">
                      <Loader />
                    </div>
                  ) : (
                    <p>{feedBack}</p>
                  )}
                </div>
              </div>
              {isLoading ? null : (
                <div className="next-prev-container">
                  <button
                    disabled={isLoading}
                    className="next-Question-btn"
                    onClick={handleprevious}
                  >
                    Previous Question
                  </button>
                  <button
                    className="next-Question-btn"
                    onClick={handleNextQuestion}
                    disabled={isLoading}
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="question-and-cam-container">
                <div className="question-container">
                  <h1>Question {currentIndex + 1}</h1>
                  <p className="question">
                    {currentIndex + 1}.{" "}
                    {questions.length !== 0 && questions[currentIndex].question}
                  </p>
                  <p className="Caution">
                    Caution: We kindly request that you refrain from refreshing
                    or clicking on backward or forward button on the page. Doing
                    so may result in the loss of your current progress,
                    necessitating the need to restart the interview from the
                    beginning. Your cooperation in this matter is greatly
                    appreciated.
                  </p>
                </div>
                <div className="cam-container">
                  <Webcam height="260px" />
                </div>
              </div>

              <div
                className="speech-text-container"
                onClick={() => setText(transcript)}
              >
                {transcript ? (
                  transcript
                ) : (
                  <h2 className="your_answer">
                    Click on Start button and start speaking and submit your
                    answer after completing ....
                  </h2>
                )}
              </div>
              <div className="btn-contianer">
                <div>
                  <button className="btn copy" onClick={setCopied}>
                    {isCopied ? "Copied!" : "Copy"}{" "}
                    <MdCopyAll className="copy-icon" />
                  </button>
                </div>
                <div>
                  <button className="btn" onClick={start}>
                    Start
                  </button>
                  <button className="btn stop" onClick={handleTurnoff}>
                    Stop
                  </button>
                  <button className="btn" onClick={handleClear}>
                    Clear
                  </button>
                  <button className="btn" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </DIV>
      )}
    </div>
  );
};

const DIV = styled.div`
  .speech-text-container {
    width: 90%;
    height: 250px;
    border: solid rgba(14, 165, 233, 0.2) 1px;
    border-radius: 10px;
    margin: auto;
    margin-top: 10px;
    padding: 20px;
    text-align: start;
    background-color: #fff1f6;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
  }

  .question-and-cam-container {
    display: flex;
    width: 93%;
    margin: auto;
    height: 295px;
    align-items: center;
  }

  .question-container {
    width: 50%;
    text-align: left;
    padding: 20px;
  }

  .cam-container {
    width: 50%;
    display: flex;
    justify-content: right;
    padding-top: 30px;
  }

  .question {
    font-size: 18px;
    margin-left: 20px;
    color: #0284c7;
    font-weight: 600;
  }

  .your_answer {
    margin-left: 20px;
    color: #4b5563;
  }

  .btn-contianer {
    display: flex;
    justify-content: space-between;
    width: 94%;
    margin: auto;
  }

  .btn {
    padding: 10px 25px;
    border: none;
    margin: 10px 15px;
    border-radius: 20px;
    background: linear-gradient(90deg, #0ea5e9 0%, #38bdf8 100%);
    box-shadow: 0 4px 10px rgba(14, 165, 233, 0.25);
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn:hover {
    padding: 10px 25px;
    margin: 10px 15px;
    border-radius: 20px;
    background: linear-gradient(90deg, #ff4b91 0%, #ff80b5 100%);
    box-shadow: 0 4px 10px rgba(255, 75, 145, 0.3);
    color: white;
    font-weight: 700;
    transform: translateY(-2px);
  }

  .copy {
    background: linear-gradient(90deg, #ff4b91 0%, #ff80b5 100%);
    font-weight: 900;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(255, 75, 145, 0.2);
    display: flex;
    align-items: center;
  }

  .copy:hover {
    background: linear-gradient(90deg, #0ea5e9 0%, #38bdf8 100%);
    box-shadow: 0 4px 10px rgba(14, 165, 233, 0.3);
  }

  .stop {
    background: #ef4444;
    box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2);
  }

  .stop:hover {
    background: #f87171;
    box-shadow: 0 4px 10px rgba(248, 113, 113, 0.3);
  }

  .copy-icon {
    font-size: 20px;
    margin-left: 5px;
  }

  .feedback-container {
    padding: 40px 20px;
    background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .feedback {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 30px;
  }

  .student-answer {
    flex: 1;
    height: 560px;
    border: 1px solid rgba(255, 75, 145, 0.2);
    background-color: white;
    text-align: left;
    padding: 20px 30px;
    color: #1f2937;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(255, 75, 145, 0.05);
    overflow-y: auto;
    box-sizing: border-box;
  }

  .chat-feedback {
    flex: 1;
    height: 560px;
    border: 1px solid rgba(14, 165, 233, 0.2);
    background-color: white;
    text-align: left;
    padding: 20px 30px;
    color: #1f2937;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(14, 165, 233, 0.05);
    overflow-y: auto;
    box-sizing: border-box;
  }

  .student-answer-heading {
    color: #ff4b91;
    border-bottom: 2px solid #ff4b91;
    padding-bottom: 10px;
  }

  .feedback-heading {
    font-size: 25px;
    color: #0284c7;
    border-bottom: 2px solid #0ea5e9;
    padding-bottom: 10px;
    font-weight: bold;
  }

  .next-Question-btn {
    padding: 12px 24px;
    margin: 10px;
    margin-top: 30px;
    border-radius: 25px;
    width: 200px;
    background: linear-gradient(90deg, #ff4b91 0%, #ff80b5 100%);
    border: none;
    color: white;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255, 75, 145, 0.3);
    transition: all 0.3s ease;
  }

  .next-Question-btn:hover {
    background: linear-gradient(90deg, #0ea5e9 0%, #38bdf8 100%);
    box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
    transform: translateY(-2px);
    color: white;
  }

  .Caution {
    font-size: 13px;
    border: solid #ef4444 1px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fac8c8;
    color: #991b1b;
  }

  .next-prev-container {
    display: flex;
  }

  .loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;
