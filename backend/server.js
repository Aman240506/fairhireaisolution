require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 5000; // Railway injects PORT automatically

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://fairhireai.vercel.app',
    'https://fairhireai-git-main-aman240506s-projects.vercel.app',
    'https://fairhireai-maau55k5d-aman240506s-projects.vercel.app'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use('/api', apiRoutes);

app.listen(PORT, '0.0.0.0', () => {  // 👈 '0.0.0.0' is important for Railway
  console.log(`Server running on port ${PORT}`);
});