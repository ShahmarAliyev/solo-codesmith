const User = require('../models/model');

const signinController = {};
signinController.signin = async (req, res, next) => {
  console.log('reqbody signin control reqbody,', req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    console.log('user', user);
    res.locals.user = user;
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = signinController;
