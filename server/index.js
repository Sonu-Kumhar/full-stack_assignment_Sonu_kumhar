import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
  try {
    const userQuestion = req.body.question;

    const response = await axios.post(
      'https://chatgpt-42.p.rapidapi.com/chat',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: userQuestion }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('LLM API error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from language model.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
