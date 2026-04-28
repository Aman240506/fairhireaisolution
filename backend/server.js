require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

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

// 👇 Add this health check route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'FairHireAI backend is running' });
});

app.use('/api', apiRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});