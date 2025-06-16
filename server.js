
// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Gunakan API key langsung untuk pengujian
const OPENAI_API_KEY = "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";

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
});

app.listen(PORT, () => console.log(`✅ Server chatbot aktif di port ${PORT}. Siap menerima permintaan.`));
