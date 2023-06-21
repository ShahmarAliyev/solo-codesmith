const User = require('../models/model');

const reservationController = {};

reservationController.createReservation = async (req, res, next) => {
  const { userId, date, time, size, location, name, image } = req.body;
  const reservation = { date, time, size, location, name, image };
  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { reservations: reservation } },
      { new: true }
    );
    res.locals.reservations = user.reservations;

    return next();
  } catch (error) {}
};
reservationController.deleteReservation = async (req, res, next) => {
  const { userId, name } = req.body;
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { reservations: { name: name } } }
    );
    return next();
  } catch (error) {}
};

reservationController.getReservations = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    res.locals.reservations = user.reservations;

    return next();
  } catch (error) {}
};

module.exports = reservationController;
