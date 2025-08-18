const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminiApiKey = process.env.GEMINI_API_KEY;

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Use model with config
const textModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.9,
    topP: 0.95,
  },
});

async function getAIResponse(resumeData, userPrompt) {
  console.log("👉 User Prompt:", userPrompt);

  // 🎯 Career goals override
  if (
    userPrompt.toLowerCase().includes("career goals") ||
    userPrompt.includes("🎯 Career goals")
  ) {
    return `My long-term goal is to become the CTO of an organization, where I can lead teams to build innovative solutions from scratch. I’m passionate about creating tools that make developers' lives easier and more efficient. In the short term, I’m focused on honing my skills, expanding my knowledge, and contributing to impactful projects that align with this vision.

If you’d like to know more about my journey or how I can bring value to your team, feel free to ask! 😊`;
  }

  // ⚙️ Technical skills override
  else if (
    userPrompt.toLowerCase().includes("technical skills") ||
    userPrompt.includes("⚙️ Technical skills")
  ) {
    return `I'm glad you asked about my technical capabilities! I have a strong foundation across various modern web development technologies. Here’s a quick breakdown of my skills:

### Languages:
• Java (Core & Advanced)  
• JavaScript  
• TypeScript  
• C++  

### Frontend Frameworks & Tools:
• Angular  
• Angular Material  
• PrimeNG  
• React  
• Next.js  
• Tailwind CSS  
• Bootstrap  
• Material UI  
• Webpack  
• Vite  

### Backend:
• Spring Boot  
• Node.js  
• Express.js  

### Databases:
• MongoDB  
• PostgreSQL  
• MySQL  

### Collaboration & Productivity Tools:
• Jira  
• Linear  
• Notion  
• Figma  
• Slack  
• Microsoft Teams  

Beyond just technical tools, I bring strong problem-solving skills, the ability to quickly learn new technologies, and a deep commitment to collaboration. These qualities help me apply my technical expertise effectively and contribute meaningfully to projects. 🚀`;
  }

  // ✅ Otherwise fallback to Gemini AI
  const combinedPrompt = `
You are an AI assistant who answers questions about a professional's resume.

Rules for your response:
- Always answer in first-person perspective (use "I", "my").
- Avoid repeating my name unnecessarily.
- Keep answers conversational, professional, and engaging.
- If asked about **skills**, highlight both technical and soft skills with examples.
- If asked about **projects**, explain impact + what I contributed.
- If asked about **experience**, summarize achievements, not just duties.

Resume data: ${JSON.stringify(resumeData)}

User's question: "${userPrompt}"

Now craft the best possible answer.
`;

  try {
    const result = await textModel.generateContent(combinedPrompt);
    const response = await result.response;
    const textResponse = await response.text();

    console.log("Gemini Raw Response:", textResponse);

    return textResponse || "Sorry, no answer available.";
  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message || error);
    return "⚠️ Sorry, I couldn’t generate a response right now. Please try again.";
  }
}


module.exports = { getAIResponse };
