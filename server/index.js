import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import userRouter from './routers/user.js';
import postRouter from './routers/post.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

const CONNECTION_URL = 'mongodb://localhost:27017';

app.use('/user', userRouter);
app.use('/post', postRouter);

(async () => {
    try {
        await mongoose.connect(CONNECTION_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: true,
        });
        app.listen(PORT, () => {
            console.log(`App listening at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();
