import express from 'express';
import dotenv from 'dotenv';
import connectDB from './configs/connectDB.js';
import cors from 'cors';
import authRoutes from './router/auth.js';
import { errorHandler, notFound } from './middleware/error.js';
const app = express();

//dotenv config
dotenv.config();

//CONNECT with mongoDB
connectDB();

// middleware configuration
app.use(express.json());

// Bypass cors
app.use(cors());

const port = process.env.PORT || 5000;
// routes

app.get('/', (req, res) => {
  res.send('hello world!');
});

//routes configuration

app.use('/api/auth', authRoutes);

// Error Handler
app.use(notFound);
app.use(errorHandler);

//CONNECT ON PORT
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
