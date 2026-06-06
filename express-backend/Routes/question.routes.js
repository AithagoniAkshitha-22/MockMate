const express = require("express");
const {QuestionModel} = require("../Models/Question.model");

const QuestionRouter = express.Router();

const fallbackQuestions = {
    mern: [
        { question: "What is MongoDB and how does it differ from SQL databases?", techStack: "mern" },
        { question: "Explain the lifecycle of a React component.", techStack: "mern" },
        { question: "What is the purpose of Express.js in a MERN application?", techStack: "mern" },
        { question: "How does Node.js handle asynchronous operations?", techStack: "mern" },
        { question: "Explain state management in React. What are the common ways to manage state?", techStack: "mern" }
    ],
    node: [
        { question: "Explain the event loop in Node.js.", techStack: "node" },
        { question: "What is the difference between setImmediate() and setTimeout()?", techStack: "node" },
        { question: "How do you handle errors in Node.js asynchronous code?", techStack: "node" },
        { question: "What are streams in Node.js and what are the different types of streams?", techStack: "node" },
        { question: "What is the purpose of package.json in Node.js?", techStack: "node" }
    ],
    java: [
        { question: "What is the difference between JDK, JRE, and JVM?", techStack: "java" },
        { question: "Explain the concept of OOPs in Java.", techStack: "java" },
        { question: "What is the difference between abstract class and interface?", techStack: "java" },
        { question: "Explain exception handling in Java.", techStack: "java" },
        { question: "What is garbage collection in Java?", techStack: "java" }
    ]
};

QuestionRouter.post("/add", async(req, res) =>{
    try {
        const NewQuestion = new QuestionModel(req.body);
        await NewQuestion.save();
        res.status(200).json({msg : "New Question has been Added"});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
})

QuestionRouter.get("/get", async(req, res) =>{
    const techStack = req.query.techStack;
    try {
        const mongoose = require("mongoose");
        if (mongoose.connection.readyState === 1) {
            const Questions = await QuestionModel.find({techStack});
            if (Questions && Questions.length > 0) {
                return res.status(200).json(Questions);
            }
        }
        const list = fallbackQuestions[techStack] || fallbackQuestions['mern'];
        res.status(200).json(list);
    } catch (error) {
        const list = fallbackQuestions[techStack] || fallbackQuestions['mern'];
        res.status(200).json(list);
    }
})

module.exports={
    QuestionRouter
}