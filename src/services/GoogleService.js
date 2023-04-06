const fs = require('fs');
const googleDrive = require('../config/googleDrive');

const GoogleService = {
  uploadFile: ({ filePath, nameFile }) => {
    /* const uploadFile = async (fileObject) => {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileObject.buffer);
        const { data } = await google.drive({ version: 'v3' }).files.create({
          media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
          },
          requestBody: {
            name: fileObject.originalname,
            parents: ['DRIVE_FOLDER_ID'],
          },
          fields: 'id,name',
        });
        console.log(`Uploaded file ${data.name} ${data.id}`);
      }; */
    return new Promise(async (resolve, reject) => {
      try {
        /* const filePath = path.join(__dirname, 'demo.jpg'); */
        const respon = await googleDrive.files.create({
          requestBody: {
            name: nameFile,
          },
          media: {
            body: fs.createReadStream(filePath),
          },
        });
        if (respon && respon.data) return resolve(respon.data);
        return resolve({ errCpde: -1 });
      } catch (error) {
        console.log(error);
        reject({ errCode: -100 });
      }
    });
  },
  deleteFile: () => {},
  generatePublicUrl: () => {},
};

module.exports = GoogleService;
