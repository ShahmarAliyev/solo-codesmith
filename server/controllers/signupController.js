const User = require('../models/model');

const signupController = {};
signupController.signup = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const newUser = await User.create({ email, password, favourites: [] });
    console.log(newUser);
    res.locals.user = newUser;
    return next();
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = signupController;
