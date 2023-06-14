import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import connectDB from './config/db';
import routes from './routes';

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());

connectDB.connect();
routes(app);

app.listen(process.env.PORT || 8000, () => {
  console.log(`server start success on port: ${process.env.PORT || 8000}`);
});
