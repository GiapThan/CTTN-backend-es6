const JWT = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const googleDrive = require('../config/googleDrive');

const MinhChungModel = require('../model/MinhChungModel');
const MinhChungService = require('../services/MinhChungService');

const MinhChungController = {
  upload: async (req, res) => {
    try {
      const filePath = path.join(__dirname, '../Access', 'demo2.docx');
      const respon = await googleDrive.files.create({
        requestBody: {
          name: 'demopdf',
        },
        media: {
          body: fs.createReadStream(filePath),
        },
      });

      console.log({ filePath: filePath, respon: respon });
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    const params = req.params;
    try {
      const response = await googleDrive.files.delete({
        fileId: params.id,
      });
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },

  generatePublicUrl: async (req, res) => {
    const params = req.params;
    try {
      await googleDrive.permissions.create({
        fileId: params.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      let response = await googleDrive.files.get({
        fileId: params.id,
        fields: 'webViewLink, webContentLink',
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = MinhChungController;
