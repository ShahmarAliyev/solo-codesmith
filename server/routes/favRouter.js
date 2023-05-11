const exporess = require('express');
const favController = require('../controllers/favController');

const favRouter = exporess.Router();

favRouter.post('/add', favController.addFav, (req, res) => {
  console.log('fav router');
  res.status(200).json('Added to your favourties');
});

favRouter.post('/', favController.getFavs, (req, res) => {
  console.log('fav router');
  res.status(200).json(res.locals.restaurants);
});
module.exports = favRouter;
