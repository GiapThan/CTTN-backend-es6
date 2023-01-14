const mongoose = require('mongoose');

const connect = (url) => {
  let conn = mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  conn.on('connected', () => {
    console.log('connect db success');
  });

  conn.on('error', (err) => {
    console.log('connect db fail', err);
  });

  return conn;
};

const mongooseDb = connect(process.env.DB_MONGOOSE_URL);

module.export = mongooseDb;
