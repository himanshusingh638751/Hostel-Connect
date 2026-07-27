import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', app: 'Hostel Connect' });
  });

  // AI Hostel Mentor API Endpoint
  app.post('/api/ai-mentor', async (req, res) => {
    try {
      const { message, context, userRole } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.json({
          reply: `👋 **Senior AI Mentor Guidance:**\n\n- **Academics & Exams:** Focus on solving 3-4 years of previous mid-sem papers. High weightage is on Unit 2 & 3 lab practicals!\n- **Marketplace Pro Tip:** Buy used engineering calculators (FX-991EX or TI) and drawing boards from 4th years in Block B4 for 50-70% off retail prices.\n- **Hostel Rule & Life:** Night curfew forms are available at Warden's office until 9:00 PM. Mess feedback forms are open every Friday!\n\n*(Note: Configure your GEMINI_API_KEY in secrets for custom live AI responses)*`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemPrompt = `You are "Senior AI Advisor" on Hostel Connect, an encouraging, knowledgeable senior student at a top hostel campus. You assist juniors and seniors with course guidance, exam prep, lab viva survival tips, hostel life hacks, price estimates for used marketplace items, and campus club navigation. Use warm, realistic hostel language (e.g. 'freshie', 'mid-sems', 'viva', 'CGPA', 'hostel block', 'mess'). Keep answers well-structured with clear markdown bullet points. User is currently a ${userRole || 'Junior Student'}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemPrompt}\n\n[Context: ${context || 'Hostel Student Inquiry'}]\nUser Question: ${message}`,
      });

      return res.json({ reply: response.text });
    } catch (err: any) {
      console.error('AI Mentor Error:', err);
      return res.status(500).json({ error: err?.message || 'Error processing mentor response.' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hostel Connect Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
