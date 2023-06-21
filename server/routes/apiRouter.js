const express = require('express');
const apiController = require('../controllers/apiController');
const apiRouter = express.Router();

apiRouter.get('/', apiController.getRestaurants, (req, res) => {
  return res.status(200).send(res.locals.restaurants);
});

apiRouter.post('/', apiController.searchRestaurants, (req, res) => {
  return res.status(200).send(res.locals.restaurants);
});

apiRouter.post('/details', apiController.findOneRest, (req, res) => {
  return res.status(200).send(res.locals.restaurant);
});

module.exports = apiRouter;
