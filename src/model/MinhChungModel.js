const { model, Schema } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const MinhChungModel = new Schema(
  {
    class: { type: String },
    hki: { type: String },
    mssv: { type: String },
    name: { type: String },
    link: { type: String },
  },
  { timestamps: true },
);

MinhChungModel.plugin(mongooseDelete, {
  deleteAt: true,
  overrideMethods: 'all',
});

module.exports = model('MinhChung', MinhChungModel);
