const express = require('express');
const apiController = require('../controllers/apiController');
const apiRouter = express.Router();

apiRouter.get('/', apiController.getRestaurants, (req, res) => {
  console.log('getrest router');
  return res.status(200).send(res.locals.restaurants);
});

apiRouter.post('/', apiController.searchRestaurants, (req, res) => {
  console.log('search rest router');
  return res.status(200).send(res.locals.restaurants);
});

apiRouter.post('/details', apiController.findOneRest, (req, res) => {
  console.log('findOne router');

  return res.status(200).send(res.locals.restaurant);
});

module.exports = apiRouter;
