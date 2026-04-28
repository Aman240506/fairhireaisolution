require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: '*' // temporary - allow all origins for testing
}));

app.use(express.json());

// Health check - Railway needs this
app.get('/', (req, res) => res.send('OK'));
app.get('/health', (req, res) => res.send('OK'));

app.use('/api', apiRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});