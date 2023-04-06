require('dotenv').config();
const JWT = require('jsonwebtoken');
const UserModel = require('../model/UserModel');
const UserService = require('../services/UserService');

const ACCESSKEY = process.env.ACCESSKEY;
const REFRESHKEY = process.env.REFRESHKEY;

const UserController = {
  RefreshToken: (req, res) => {
    try {
      let refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.json({ errCode: -1 });
      let result = JWT.verify(refreshToken, REFRESHKEY);
      if (result) {
        delete result.iat;
        delete result.exp;
        const accessToken = JWT.sign(result, ACCESSKEY, {
          expiresIn: '1d',
        });
        const refreshToken = JWT.sign(result, REFRESHKEY, {
          expiresIn: '7d',
        });
        return res
          .cookie('refreshToken', refreshToken, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          })
          .json({ errCode: 0, data: { ...result, accessToken } });
      } else {
        return res.json({ errCode: -2 });
      }
    } catch (error) {
      res.json({ errCode: -100 });
    }
  },

  SignUp: async (req, res) => {
    const user = req.body;
    try {
      const response = await UserService.SignUp(user);
      if (response && response.errCode === 0) {
        const accessToken = JWT.sign(response.data, ACCESSKEY, {
          expiresIn: '1d',
        });
        const refreshToken = JWT.sign(response.data, REFRESHKEY, {
          expiresIn: '7d',
        });

        response.data['accessToken'] = accessToken;

        return res
          .cookie('refreshToken', refreshToken, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          })
          .json(response);
      } else {
        return res.json({ errCode: -1 }); // đã có tài khoản
      }
    } catch (error) {
      console.log(error);
      res.json({ error: -100 });
    }
  },

  LogIn: async (req, res) => {
    const user = req.body;
    try {
      const response = await UserService.LogIn(user);
      if (response.errCode === 0) {
        const accessToken = JWT.sign(response.data, ACCESSKEY, {
          expiresIn: '1d',
        });
        const refreshToken = JWT.sign(response.data, REFRESHKEY, {
          expiresIn: '7d',
        });

        response.data['accessToken'] = accessToken;

        return res
          .cookie('refreshToken', refreshToken, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          })
          .json(response);
      }

      return res.json({ errCode: -1 }); // chưa có tk or pass sai
    } catch (error) {
      return res.json({ errCode: -100, msg: 'err server' });
    }
  },

  LogOut: async (req, res) => {
    res.clearCookie('refreshToken').json({ errCode: 0 });
  },

  all: async (req, res) => {
    const user = await UserModel.find();
    res.send(user);
  },
  delete: async (req, res) => {
    const user = await UserModel.deleteMany();
    res.send(user);
  },
};

module.exports = UserController;
