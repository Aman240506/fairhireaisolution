const express = require('express');
const multer = require('multer');
const { parseResume } = require('../services/resumeParser');
const { runBiasSimulations } = require('../services/biasEngine');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription;
    let resumeText = req.body.resumeText || '';

    if (req.file) {
      if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Please upload a valid PDF file.' });
      }
      try {
        const pdfParse = require('pdf-parse'); // 👈 Move import here (lazy load)
        const pdfData = await pdfParse(req.file.buffer);
        resumeText = pdfData.text;
      } catch (parseError) {
        console.error('Error parsing PDF:', parseError);
        return res.status(500).json({ error: 'Failed to extract text from the PDF file.' });
      }
    }

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({ error: 'No resume text found or provided.' });
    }

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ error: 'Job description is required.' });
    }

    console.log('Step 1: Parsing resume text...');
    const parsedCandidate = await parseResume(resumeText);
    
    console.log('Step 2: Running bias simulations...');
    const finalResults = await runBiasSimulations(parsedCandidate, jobDescription);

    return res.json(finalResults);

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'An error occurred during analysis.' });
  }
});

module.exports = router;
