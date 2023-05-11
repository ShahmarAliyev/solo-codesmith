const express = require('express');
const signupController = require('../controllers/signupController');
const signupRouter = express.Router();

signupRouter.post('/', signupController.signup, (req, res) => {
  return res.status(200).send(res.locals.user);
});
module.exports = signupRouter;
