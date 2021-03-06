import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: 'true' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// https://cloud.mongodb.com/v2/6093ccd26fc9157b61020191#clusters
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);
