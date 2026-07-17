import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { NURU_PROMPT } from "./src/lib/nuruPrompt.js";

let aiClient: GoogleGenAI | null = null;

function getAi(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('GEMINI_API_KEY environment variable is missing');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ 
      apiKey: key, 
      httpOptions: {
        headers: {
            'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  // API route for chatbot
  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    try {
      const ai = getAi();
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Transfer-Encoding', 'chunked');

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3.5-flash",
        contents: `${NURU_PROMPT}
Message: ${message}`,
      });

      for await (const chunk of responseStream) {
        res.write(chunk.text);
      }
      res.end();
    } catch (error: any) {
      console.error("Gemini API error:", error);
      if (error.message && error.message.includes('403')) {
          res.status(403).json({ error: "The Gemini API key provided is invalid or has been reported as leaked. Please update it in your project settings." });
      } else {
          res.status(500).json({ error: error.message || "Failed to get response from AI" });
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
