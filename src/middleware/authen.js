const JWT = require('jsonwebtoken');

const ACCESSKEY = process.env.ACCESSKEY;

const authenAdim = (req, res, next) => {
  const accessToken = req.headers.author;
  try {
    let result = JWT.verify(accessToken, ACCESSKEY);
    if (result.roleId === '00') return next();
    return res.json({ errCode: -1 });
  } catch (error) {
    console.log(error);
    res.json({ errCode: -2 });
  }
};

module.exports = { authenAdim };
