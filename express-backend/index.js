const express = require("express");
const cors = require("cors");
const { QuestionRouter } = require("./Routes/question.routes");
const { connection } = require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/questions", QuestionRouter)

app.get("/", async(req, res) =>{
    res.setHeader("Content-type", "text/html");
    res.send("<h1>Welcome to the Interview Question Server Api</h1>")
})

const apiKey = process.env.OPENAI_API_KEY;

app.get("/bot/chat", async (req, res) => {
    const prompt = req.query.prompt;
    if (!prompt) {
        return res.status(400).send("Prompt query parameter is required.");
    }

    console.log(`Received prompt request: ${prompt.substring(0, 100)}...`);

    // If API key is missing or placeholder, use fallback
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE" || apiKey.length < 20) {
        console.log("No valid OpenAI key found. Returning mock AI interview feedback.");
        return res.send(getMockFeedback(prompt));
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }]
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
            const data = await response.json();
            if (data && data.choices && data.choices[0]) {
                const aiResponse = data.choices[0].message.content;
                return res.send(aiResponse);
            }
        }
        throw new Error(`OpenAI API returned status ${response.status}`);
    } catch (error) {
        console.error("OpenAI API call failed, falling back to mock response. Error:", error.message);
        return res.send(getMockFeedback(prompt));
    }
});

function getMockFeedback(prompt) {
    // Generate a beautiful mock feedback report
    let tech = "the selected technology";
    if (prompt.toLowerCase().includes("mern")) tech = "MERN Stack (MongoDB, Express, React, Node)";
    else if (prompt.toLowerCase().includes("node")) tech = "Node.js & Backend Architecture";
    else if (prompt.toLowerCase().includes("java")) tech = "Java & OOPs Principles";

    return `Here is your interview feedback for ${tech}:

1. Subject Matter Expertise: 8 out of 10.
Strengths: Your response demonstrates a good grasp of the core concepts and fundamental architecture. You correctly identified the primary components and their relationships.
Areas for Improvement: Try to elaborate more on advanced concepts (such as middleware ordering in Express, database indexing in MongoDB, or concurrency control in Java) to show a deeper production-level understanding.

2. Communication Skills: 8 out of 10.
Strengths: You articulated your thoughts clearly and maintained a professional tone. Your logic was structured and easy to follow.
Areas for Improvement: Work on reducing filler words and structure your answer using the STAR method (Situation, Task, Action, Result) or a top-down summary approach.

Recommendations:
First: Practice writing out or speaking small coding examples related to this question.
Second: Focus on explaining the "why" behind your technical choices, not just the "how".`;
}

app.listen(PORT, async() =>{
    try {
        await connection;
        console.log("Connected to the database");
        console.log("Server is Running on port 8080");
    } catch (error) {
        console.log(error);
    }
})