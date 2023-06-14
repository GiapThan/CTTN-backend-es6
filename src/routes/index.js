const userRoute = require('./userRoute');
const classRoute = require('./classRoute');
const minhChungRoute = require('./minhChungRoute');

const routes = (app) => {
  app.use('/api/user', userRoute);
  app.use('/api/class', classRoute);
  app.use('/api/minh-chung', minhChungRoute);
};

module.exports = routes;
