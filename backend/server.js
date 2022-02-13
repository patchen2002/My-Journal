import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import postRouter from './routers/postRouter.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
    process.env.DB_CONNECTION,
    () => console.log('Connected to DB')
);

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));