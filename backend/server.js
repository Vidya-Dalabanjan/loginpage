const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/users', authRoutes);

app.get('/', (req, res) => res.send('API running'));
app.listen(process.env.PORT, () => console.log( "Server on http://localhost:${process.env.PORT}"));