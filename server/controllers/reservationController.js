const User = require('../models/model');

const reservationController = {};

reservationController.createReservation = async (req, res, next) => {
  console.log('create reservattion controller');
  const { userId, date, time, size, location, name, image } = req.body;
  const reservation = { date, time, size, location, name, image };
  console.log('req.body create reservat ', req.body);
  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { reservations: reservation } },
      { new: true }
    );
    res.locals.reservations = user.reservations;

    return next();
  } catch (error) {
    console.log(error.message);
  }
};
reservationController.deleteReservation = async (req, res, next) => {
  console.log('delete reservattion controller');
  const { userId, name } = req.body;
  console.log('req body delete controller', req.body);
  console.log('reso name', name);
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { reservations: { name: name } } }
    );
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

reservationController.getReservations = async (req, res, next) => {
  console.log('getReservations  controller');
  const { userId } = req.body;
  console.log('req.body getReservations req body ', req.body);
  try {
    const user = await User.findOne({ _id: userId });
    res.locals.reservations = user.reservations;

    return next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = reservationController;
