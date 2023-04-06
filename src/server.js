const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

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
