const resumeData = require('../data/myResumeData.js');
const { getAIResponse } = require('../services/geminiService'); 

exports.askAI = async (req, res) => {
  const { prompt } = req.body;

  try {
    const answer = await getAIResponse(resumeData, prompt);
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "Server error occurred." });
  }
};
