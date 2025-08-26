// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL_ID = process.env.GEMINI_MODEL_ID || "gemini-1.5-flash";
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

app.use(cors());
app.use(express.json());

// Health
app.get("/health", (_req, res) => res.json({ status: "Server is running!" }));

// ---- helpers ----
function ensureGeminiKey(res) {
  if (!GEMINI_API_KEY) {
    res.status(500).json({ error: "API configuration error. Set GEMINI_API_KEY." });
    return false;
  }
  return true;
}

async function callGemini(prompt) {
  const url = `${GEMINI_BASE}/${GEMINI_MODEL_ID}:generateContent?key=${GEMINI_API_KEY}`;
  const body = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
  const { data } = await axios.post(url, body, {
    headers: { "Content-Type": "application/json" },
    timeout: 30000,
  });
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    (data?.candidates?.[0]?.content?.parts || [])
      .map(p => p?.text)
      .filter(Boolean)
      .join("\n");
  if (!text) throw new Error("No content generated from AI model");
  return text.trim();
}

// ---- handlers ----
async function generateExamHandler(req, res) {
  try {
    if (!ensureGeminiKey(res)) return;

    let { topic, questionCount } = req.body || {};
    topic = String(topic ?? "").trim();
    const count = Number(questionCount);

    if (!topic || !Number.isFinite(count)) {
      return res.status(400).json({ error: "Both topic and questionCount are required." });
    }
    if (count < 1 || count > 20) {
      return res.status(400).json({ error: "questionCount must be between 1 and 20." });
    }

    const prompt = `Generate a math exam for primary school students with exactly ${count} questions on the topic "${topic}".

Format strictly:
- Title: "Math Exam - ${topic}"
- Number questions: 1., 2., 3., ...
- Ages 6–12
- Mixed difficulty
- Simple, relatable word problems
- Clear, unambiguous wording
Do NOT include answers. Only questions.`;

    const exam = await callGemini(prompt);

    res.json({
      exam,
      topic,
      questionCount: count,
      generatedAt: new Date().toISOString(),
      model: GEMINI_MODEL_ID,
    });
  } catch (error) {
    console.error("Error generating exam:", error?.response?.status || "", error.message);
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      return res.status(408).json({ error: "Request timeout. Try again." });
    }
    const s = error?.response?.status;
    if (s === 403) return res.status(403).json({ error: "API key authentication failed." });
    if (s === 429) return res.status(429).json({ error: "Rate limited. Try later." });
    return res.status(500).json({ error: "Failed to generate exam. Please try again later." });
  }
}

async function answerKeyHandler(req, res) {
  try {
    if (!ensureGeminiKey(res)) return;

    let { examQuestions, topic } = req.body || {};
    examQuestions = String(examQuestions ?? "").trim();
    topic = String(topic ?? "").trim();

    if (!examQuestions) {
      return res.status(400).json({ error: "examQuestions is required to generate an answer key." });
    }

    const prompt = `Here are math exam questions for primary school students${
      topic ? ` on the topic "${topic}"` : ""
    }:

${examQuestions}

Provide a clear answer key with brief explanations for teachers.
Format:
1. [Answer] - [Brief explanation]
2. [Answer] - [Brief explanation]
...`;

    const answerKey = await callGemini(prompt);

    res.json({
      answerKey,
      generatedAt: new Date().toISOString(),
      model: GEMINI_MODEL_ID,
    });
  } catch (error) {
    console.error("Error generating answer key:", error?.response?.status || "", error.message);
    res.status(500).json({ error: "Failed to generate answer key. Please try again." });
  }
}

// ---- routes (versioned + legacy aliases) ----
app.post("/api/exams/generate", generateExamHandler);
app.post("/api/exams/answer-key", answerKeyHandler);

// legacy to avoid 404 from old clients
app.post("/generate-exam", generateExamHandler);
app.post("/generate-answer-key", answerKeyHandler);

// 404 logger
app.use((req, res) => {
  console.error("404:", req.method, req.originalUrl);
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
  console.log(`Exam endpoint: POST http://localhost:${PORT}/api/exams/generate`);
  console.log(`Answer key endpoint: POST http://localhost:${PORT}/api/exams/answer-key`);
});
