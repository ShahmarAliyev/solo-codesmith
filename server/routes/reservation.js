const express = require('express');
const reservationController = require('../controllers/reservationController');
const reservationRouter = express.Router();

reservationRouter.post(
  '/create',
  reservationController.createReservation,
  (req, res) => {
    res.status(200).json(res.locals.reservations);
  }
);

reservationRouter.post(
  '/delete',
  reservationController.deleteReservation,
  (req, res) => {
    res.status(200).json('deleted');
  }
);

reservationRouter.post(
  '/',
  reservationController.getReservations,
  (req, res) => {
    res.status(200).json(res.locals.reservations);
  }
);

module.exports = reservationRouter;
