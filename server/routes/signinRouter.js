const express = require('express');
const signinController = require('../controllers/signinController');
const signinRouter = express.Router();

signinRouter.post('/', signinController.signin, (req, res) => {
  return res.status(200).json(res.locals.user);
});
module.exports = signinRouter;
