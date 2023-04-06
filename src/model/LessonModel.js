const { model, Schema } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const LessonModel = new Schema(
  {
    groupId: { type: String },
    name: { type: String },
    linkAvt: { type: String },
    linkVideo: { type: String },
    description: { type: String },
  },
  { timestamps: true },
);

LessonModel.plugin(mongooseDelete, {
  deleteAt: true,
  overrideMethods: 'all',
});

module.exports = model('Lesson', LessonModel);
