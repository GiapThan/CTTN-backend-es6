const ClassService = require('../services/ClassService');

const ClassController = {
  getAllUser: async (req, res) => {
    const query = req.query;
    try {
      const response = await ClassService.getAllUser(query);
      if (response.errCode === -1) {
        res.json({ errCode: -1 });
      } else {
        res.json({ errCode: 0, data: response });
      }
    } catch (error) {
      res.json({ errCode: -100 });
    }
  },
};

module.exports = ClassController;
