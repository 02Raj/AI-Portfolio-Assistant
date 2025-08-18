require('dotenv').config();
const express = require('express');
const cors = require('cors'); // This line was missing

const connectDB = require('./config/db');
const askRoutes = require('./routes/askRoutes');

const app = express();

app.use(cors()); // Now 'cors' is defined
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api', askRoutes);

// Default route for health check
app.get('/', (req, res) => {
  res.send('AI Portfolio Assistant Backend Running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));