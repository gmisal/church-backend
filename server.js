import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import memberRoutes from './routes/memberRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import groupRoutes from './routes/groupRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/members', memberRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/groups', groupRoutes);

const PORT = process.env.PORT || 5000;  

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  })
