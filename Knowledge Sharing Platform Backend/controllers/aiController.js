const { GoogleGenAI } = require('@google/genai');

exports.generateContent = async (req, res) => {
  try {
    const { prompt, type } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    const genAI = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY 
    });

    let fullPrompt = '';
    if (type === 'content') {
      fullPrompt = `Generate a detailed knowledge sharing post content about: ${prompt}. Make it informative and well-structured.`;
    } else if (type === 'summary') {
      fullPrompt = `Summarize the following content in 2-3 sentences: ${prompt}`;
    } else if (type === 'tags') {
      fullPrompt = `Generate 3-5 relevant tags (single words or short phrases) for this content: ${prompt}. Return only the tags separated by commas.`;
    } else if (type === 'improve') {
      fullPrompt = `Improve the following text by making it clearer, fixing grammar, and making it more concise while keeping the same meaning: ${prompt}`;
    } else if (type === 'title') {
      fullPrompt = `Suggest a better, more engaging title for an article with this content: ${prompt}. Return only the title, nothing else.`;
    }

    const result = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt
    });

    res.json({ content: result.text });
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({ error: error.message || 'AI generation failed' });
  }
};
