const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Load API key from java-backend/Bot/.env if available
let apiKey = process.env.OPENAI_API_KEY;
try {
    const javaEnvPath = path.join(__dirname, "..", "java-backend", "Bot", ".env");
    if (fs.existsSync(javaEnvPath)) {
        const envContent = fs.readFileSync(javaEnvPath, "utf-8");
        const match = envContent.match(/OPENAI_API_KEY\s*=\s*([^\s]+)/);
        if (match && match[1]) {
            apiKey = match[1].trim();
        }
    }
} catch (e) {
    console.log("Could not load API key from java-backend .env:", e.message);
}

const PORT = 8081;

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
    let question = "the interview question";
    let answer = "";
    
    const questionMatch = prompt.match(/This is the question:\s*["']([^"']+)["']/i);
    const answerMatch = prompt.match(/this is my answer:\s*["']([^"']+)["']/i);
    
    if (questionMatch) {
        question = questionMatch[1];
    }
    if (answerMatch) {
        answer = answerMatch[1];
    }

    let role = "Technical Specialist";
    const roleMatch = prompt.match(/interviewer for a\s+([^.]+)\s+role/i);
    if (roleMatch) {
        role = roleMatch[1];
    }

    let tech = "general technical concepts";
    if (prompt.toLowerCase().includes("mern")) tech = "MERN Stack";
    else if (prompt.toLowerCase().includes("node")) tech = "Node.js";
    else if (prompt.toLowerCase().includes("java")) tech = "Java Backend";
    else if (prompt.toLowerCase().includes("html")) tech = "HTML Structure";
    else if (prompt.toLowerCase().includes("css")) tech = "CSS Layouts";
    else if (prompt.toLowerCase().includes("javascript")) tech = "JavaScript Logic";
    else if (prompt.toLowerCase().includes("sql")) tech = "SQL Databases";
    else if (prompt.toLowerCase().includes("python")) tech = "Python Programming";
    else if (prompt.toLowerCase().includes("intro")) tech = "Self Introduction Vetting";

    const wordCount = answer.trim().split(/\s+/).filter(w => w.length > 0).length;
    let subjectScore = 7;
    let commsScore = 7;
    let strengthsSub = "Your response demonstrates a good understanding of the core concepts and standard architecture.";
    let weaknessesSub = "Try to elaborate more on advanced topics or internal execution mechanics to show production-level maturity.";
    let strengthsComms = "You articulated your thoughts clearly and maintained a professional tone.";
    let weaknessesComms = "Focus on structuring your answers using structured methodology and reducing conversational fillers.";

    if (wordCount === 0 || answer.toLowerCase().includes("click on start button")) {
        subjectScore = 2;
        commsScore = 2;
        strengthsSub = "We did not receive any audible or transcribed text response. Please check that your microphone is active and you speak clearly after clicking Start.";
        weaknessesSub = "You must provide an answer to be evaluated.";
        strengthsComms = "None observed.";
        weaknessesComms = "Verify your audio input settings and speak directly into the microphone.";
    } else if (wordCount < 10) {
        subjectScore = 4;
        commsScore = 5;
        strengthsSub = "You provided a direct but very brief answer.";
        weaknessesSub = "Your response is too short. Try to elaborate on technical details and provide concrete examples.";
        strengthsComms = "Your delivery was direct.";
        weaknessesComms = "Speak in complete sentences and explain the reasoning behind your statements.";
    } else if (wordCount > 40) {
        subjectScore = 9;
        commsScore = 8;
        strengthsSub = "Your answer was comprehensive, addressing both primary features and practical implementation details.";
        weaknessesSub = "Ensure you maintain focus on the core question and do not stray into unrelated topics.";
        strengthsComms = "Excellent vocabulary and detailed elaboration.";
        weaknessesComms = "Keep answers structured to avoid losing the interviewer's attention.";
    }

    let techTip = "Focus on explaining the 'why' behind your design patterns.";
    if (tech === "HTML Structure") {
        techTip = "Ensure you explain the importance of SEO, accessibility (ARIA roles), and valid semantic tags.";
    } else if (tech === "CSS Layouts") {
        techTip = "Mention responsive grid layouts (Flexbox/CSS Grid), browser compatibility, and CSS variables.";
    } else if (tech === "JavaScript Logic") {
        techTip = "Cover asynchronous execution loops, variable scoping, and memory closures.";
    } else if (tech === "SQL Databases") {
        techTip = "Focus on query speed, normalizations, joins, and indexing structures.";
    } else if (tech === "Python Programming") {
        techTip = "Mention generator functions, execution decorators, and Pythonic conventions.";
    } else if (tech === "Self Introduction Vetting") {
        techTip = "Structure your pitch around your most impactful projects and why your background fits this company.";
    }

    return `Here is your interview feedback as a candidate for the ${role} position:

1. Subject Matter Expertise: ${subjectScore} out of 10.
Strengths: ${strengthsSub}
Areas for Improvement: ${weaknessesSub}

2. Communication Skills: ${commsScore} out of 10.
Strengths: ${strengthsComms}
Areas for Improvement: ${weaknessesComms}

Recommendations:
- Detail: ${techTip}
- Action: Try to outline a specific project or past scenario where you applied these concepts to solidify your answer.`;
}

app.listen(PORT, () => {
    console.log(`Mock/Fallback OpenAI Bot Service is running on http://localhost:${PORT}`);
});
