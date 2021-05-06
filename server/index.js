import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();



app.use(express.json({ limit: '30mb', extended: 'true' }))
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/posts', postRoutes)

// https://cloud.mongodb.com/v2/6093ccd26fc9157b61020191#clusters
const CONNECTION_URL = 'mongodb+srv://admin-earl:test123@cluster0.cko3h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);
