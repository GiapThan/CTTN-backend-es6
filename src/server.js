const express = require('express');
const app = express();
require('dotenv').config();

const connectDB = require('./config/db');
const routes = require('./routes');

routes(app);

app.listen(process.env.PORT || 8000, () => {
  console.log(`server start success on port: ${process.env.PORT || 8000}`);
});
