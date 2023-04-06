const userRoute = require('./userRoute');
const minhChungRoute = require('./minhChungRoute');

const routes = (app) => {
  app.use('/api/user', userRoute);
  app.use('/api/minh-chung', minhChungRoute);
};

module.exports = routes;
