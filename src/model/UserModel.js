const { model, Schema } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const UserModel = new Schema(
  {
    mssv: { type: String },
    name: { type: String },
    password: { type: String },
    roleId: { type: String, default: '01' },
  },
  { timestamps: true },
);

UserModel.plugin(mongooseDelete, {
  deleteAt: true,
  overrideMethods: 'all',
});

module.exports = model('User', UserModel);
