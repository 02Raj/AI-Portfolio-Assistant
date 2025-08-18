// server/controller/askController.js
const resumeData = require('../data/resumeData');
const { getAIResponse } = require('../services/geminiService'); 

exports.askAI = async (req, res) => {
  const { prompt } = req.body;

  try {
    // Here, use the hardcoded resume data instead of fetching from DB
    const answer = await getAIResponse(resumeData, prompt);

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "Server error occurred." });
  }
};
