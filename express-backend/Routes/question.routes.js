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
    ],
    intro: [
        { question: "Tell me about yourself and your professional background.", techStack: "intro" },
        { question: "Why do you want to work for our company?", techStack: "intro" },
        { question: "What are your greatest strengths and weaknesses?", techStack: "intro" },
        { question: "Where do you see yourself in five years?", techStack: "intro" },
        { question: "Can you describe a challenging situation at work and how you handled it?", techStack: "intro" }
    ],
    html: [
        { question: "What is the difference between HTML elements and tags?", techStack: "html" },
        { question: "What is semantic HTML and why is it important?", techStack: "html" },
        { question: "Explain the difference between block-level and inline elements.", techStack: "html" },
        { question: "How do you achieve accessibility in HTML (e.g. ARIA roles)?", techStack: "html" },
        { question: "What is the purpose of the doctype declaration at the beginning of an HTML document?", techStack: "html" }
    ],
    css: [
        { question: "Explain the CSS Box Model.", techStack: "css" },
        { question: "What is the difference between Flexbox and CSS Grid, and when would you use each?", techStack: "css" },
        { question: "Explain selector specificity in CSS.", techStack: "css" },
        { question: "How do you make a website responsive in CSS?", techStack: "css" },
        { question: "What are CSS variables (custom properties) and how do they work?", techStack: "css" }
    ],
    javascript: [
        { question: "Explain the concept of closures in JavaScript.", techStack: "javascript" },
        { question: "What is the event loop and how does JavaScript handle asynchronous tasks?", techStack: "javascript" },
        { question: "What is the difference between var, let, and const?", techStack: "javascript" },
        { question: "What is a Promise and how does async/await work under the hood?", techStack: "javascript" },
        { question: "Explain the 'this' keyword in JavaScript and how call/apply/bind work.", techStack: "javascript" }
    ],
    sql: [
        { question: "What is a primary key and a foreign key in SQL?", techStack: "sql" },
        { question: "Explain the differences between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.", techStack: "sql" },
        { question: "What is database normalization and what are the normal forms?", techStack: "sql" },
        { question: "What is an index in SQL and why is it used?", techStack: "sql" },
        { question: "Explain the difference between DELETE and TRUNCATE statements.", techStack: "sql" }
    ],
    python: [
        { question: "What are the key differences between list and tuple in Python?", techStack: "python" },
        { question: "Explain the concept of decorators in Python.", techStack: "python" },
        { question: "How does memory management work in Python? (Garbage collection and reference counting)", techStack: "python" },
        { question: "What is the difference between deep copy and shallow copy in Python?", techStack: "python" },
        { question: "Explain generator functions and the yield keyword in Python.", techStack: "python" }
    ]
};

QuestionRouter.post("/add", async(req, res) =>{
    try {
        if (req.body && req.body.techStack) {
            req.body.techStack = String(req.body.techStack).trim().toLowerCase();
        }
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
        const normalizedKey = techStack ? String(techStack).trim().toLowerCase() : "mern";
        if (mongoose.connection.readyState === 1) {
            const Questions = await QuestionModel.find({
                techStack: { $regex: new RegExp(`^${normalizedKey.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, "i") }
            });
            if (Questions && Questions.length > 0) {
                return res.status(200).json(Questions);
            }
        }
        const list = fallbackQuestions[normalizedKey] || fallbackQuestions['mern'];
        res.status(200).json(list);
    } catch (error) {
        const normalizedKey = techStack ? String(techStack).trim().toLowerCase() : "mern";
        const list = fallbackQuestions[normalizedKey] || fallbackQuestions['mern'];
        res.status(200).json(list);
    }
})

module.exports={
    QuestionRouter
}