const UserModel = require('../model/UserModel');
const ClassService = {
  getAllUser: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        let listUser;
        if (query.all) {
          listUser = await UserModel.find().select('-_id mssv name class');
        } else if (query.hasClass) {
          listUser = await UserModel.find({ class: '48.01.TOAN.SPB' }).select(
            '-_id mssv name class',
          );
        } else {
          listUser = await UserModel.find({ class: '' }).select(
            '-_id mssv name class',
          );
        }
        if (listUser.length !== 0) return resolve(listUser);
        resolve({ errCode: -1 });
      } catch (error) {
        console.log(error);
        reject({ errCode: -100 });
      }
    });
  },
};

module.exports = ClassService;
