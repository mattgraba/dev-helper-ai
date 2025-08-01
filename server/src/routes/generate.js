const express = require('express');
const router = express.Router();
const { sendPrompt } = require('../services/openaiService');
const Response = require('../models/Response');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  const {
    description,
    language = 'JavaScript',
    context = '',
    fileType = '',
    outputPreference = 'code only, no explanation',
  } = req.body;

  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({ error: 'Missing or invalid description' });
  }

  const prompt = `
Generate ${fileType ? fileType + ' ' : ''}code in ${language} for the following description:

"${description}"

Output preference: ${outputPreference}

${context ? `\n\nAdditional context:\n${context}` : ''}
`;

  try {
    const generatedCode = await sendPrompt(prompt);

    if (req.user?.id) {
      await Response.create({
        userId: req.user.id,
        input: description,
        output: generatedCode,
        command: 'generate',
        createdAt: new Date(),
      });
    }

    res.json({ generatedCode });
  } catch (err) {
    console.error('Generate route error:', err);
    res.status(500).json({ error: 'Failed to generate code' });
  }
});

module.exports = router;
