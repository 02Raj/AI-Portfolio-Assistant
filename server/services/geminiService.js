const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminiApiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(geminiApiKey);

const textModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.9,
    topP: 0.95,
  },
});

async function getAIResponse(resumeData, userPrompt) {
  console.log("👉 User Prompt:", userPrompt);

  let combinedPrompt = "";

  // 🚀 Projects condition
  if (
    userPrompt.toLowerCase().includes("recent projects") ||
    userPrompt.includes("🚀 Recent projects")
  ) {
    combinedPrompt = `
You are an AI assistant. The user is asking about recent projects.

Rules:
- Answer in first person (use "I", "my").
- Format MUST be exactly like this:

"Absolutely! Here are a few recent projects I'm really proud of:

1. Project Name
   • Tech Stack: [list]  
   • Overview: [short description]  
   • Outcome: [business or technical impact]  

2. Project Name
   • Tech Stack: [list]  
   • Overview: [short description]  
   • Outcome: [business or technical impact]  

Each project should sound professional and impactful.
"

Resume data: ${JSON.stringify(resumeData)}

User’s question: "${userPrompt}"
`;
  }

  // 🎯 Career goals condition
  else if (
    userPrompt.toLowerCase().includes("career goals") ||
    userPrompt.includes("🎯 Career goals")
  ) {
    combinedPrompt = `
The user is asking about career goals.

Rules:
- Speak in first person.
- Be professional, ambitious but realistic.
- Structure should be like this:

"My long-term goal is [...]. In the short term, I’m focused on [...]."

Resume data: ${JSON.stringify(resumeData)}

User’s question: "${userPrompt}"
`;
  }

  // ⚙️ Technical skills condition
  else if (
    userPrompt.toLowerCase().includes("technical skills") ||
    userPrompt.includes("⚙️ Technical skills")
  ) {
    combinedPrompt = `
The user is asking about technical skills.

Rules:
- First person voice.
- Provide a structured bullet list.
- Mention both technical AND soft skills.
- Keep it engaging, not just a flat list.

Resume data: ${JSON.stringify(resumeData)}

User’s question: "${userPrompt}"
`;
  }

  // ✅ Default fallback
  else {
    // check if unrelated to resume
    const resumeKeywords = ["skills", "projects", "experience", "career", "work", "job"];
    const isResumeRelated = resumeKeywords.some(keyword =>
      userPrompt.toLowerCase().includes(keyword)
    );

    if (!isResumeRelated) {
      return `😅 That’s a fun question! "${userPrompt}" isn’t really related to my resume.  
I usually focus on sharing my professional background, skills, and projects — but hey, I can tell you this much: if we’re talking about *${userPrompt}*, I’d say it’s cool, but not as cool as the work I’ve been doing in frontend development! 🚀  

Would you like me to walk you through some of my projects instead?`;
    }

    combinedPrompt = `
You are an AI assistant who answers questions about a professional's resume.
- Always in first person.
- Keep answers engaging and structured.

Resume data: ${JSON.stringify(resumeData)}

User’s question: "${userPrompt}"
`;
  }

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
