const resumeData = require('../data/myResumeData.js');
const { getAIResponse } = require('../services/geminiService'); 

exports.askAI = async (req, res) => {
  const { prompt, sessionId } = req.body; // Extract sessionId here

  try {
    const answer = await getAIResponse(resumeData, prompt, sessionId); // Pass sessionId
    res.json({ answer, sessionId }); // Optionally return sessionId in response
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "Server error occurred." });
  }
};
