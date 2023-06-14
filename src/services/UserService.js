const bcrypt = require('bcrypt');

const UserModel = require('../model/UserModel');

const SALT = 10;

const UserSevice = {
  SignUp: ({ mssv, password, name }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await UserModel.findOne({ mssv });
        if (user) return resolve({ errCode: -1, name: 'da co tai khoan nay' });

        let hashPassword = await bcrypt.hash(password, SALT);
        let newUser = await UserModel.create({
          mssv,
          name,
          password: hashPassword,
        });

        if (newUser) {
          return resolve({
            errCode: 0,
            data: {
              mssv: newUser.mssv,
              name: newUser.name,
              class: newUser.class,
              roleId: newUser.roleId,
            },
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  LogIn: ({ mssv, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await UserModel.findOne({ mssv });
        if (!user)
          return resolve({ errCode: -1, msg: 'chua co tai khoan nay' });
        if (user.password === '') {
          let hashPassword = await bcrypt.hash(password, SALT);
          let updated = await UserModel.updateOne(
            { mssv },
            { password: hashPassword },
          );
          if (updated)
            resolve({
              errCode: 0,
              data: {
                mssv: user.mssv,
                name: user.name,
                class: user.class,
                roleId: user.roleId,
              },
            });
        } else {
          let result = await bcrypt.compare(password, user.password);
          if (!result) return resolve({ errCode: -2, msg: 'pass khong dung' });

          resolve({
            errCode: 0,
            data: {
              mssv: user.mssv,
              name: user.name,
              class: user.class,
              roleId: user.roleId,
            },
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = UserSevice;
