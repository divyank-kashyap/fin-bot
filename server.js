const express = require('express');
const axios = require('axios');
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware setup
app.use(cors());
app.use(express.json());


// Route to handle finance-related queries
app.post('/finance-chat', async (req, res) => {
  const { message } = req.body;  // Consistent with frontend "message"

  if (!message) {
    return res.status(400).json({ error: "Please provide a message." });
  }

  const apiKey = "AIzaSyBp0KRp6RDGgbJvXrD4BVNJJyXGXYvriyY";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const data = {
    contents: [
      {
        parts: [{ text: `You are a finance assistant. Also give answers in short: Answer the following question: ${message}` }]
      }
    ]
  };

  try {

    const response = await axios.post(apiUrl, data, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Extract and send the key content from the response
    const reply = response.data.candidates[0]?.content || "Sorry, I couldn't generate a response.";
    res.json({ reply });

  } catch (error) {
    console.error("API Error:", error.message);  // Log error internally
    res.status(500).json({ error: "An internal error occurred. Please try again later." });
  }
});


// app.post("/emi", async (req, res) => {
//   const 
// })

// Start the server
app.listen(PORT, () => {
  console.log(`Finance chatbot is running on port ${PORT}`);
});

