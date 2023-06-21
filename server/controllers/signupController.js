const User = require('../models/model');

const signupController = {};
signupController.signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const newUser = await User.create({ email, password, favourites: [] });
    res.locals.user = newUser;
    return next();
  } catch (error) {}
};
module.exports = signupController;
