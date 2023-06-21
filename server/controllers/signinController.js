const User = require('../models/model');

const signinController = {};
signinController.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    res.locals.user = user;
    return next();
  } catch (error) {}
};

module.exports = signinController;
