const exporess = require('express');
const favController = require('../controllers/favController');

const favRouter = exporess.Router();

favRouter.post('/add', favController.addFav, (req, res) => {
  console.log('fav router');
  return res.status(200).json('Added to your favourties');
});
favRouter.post('/comment', favController.writeComment, (req, res) => {
  console.log('fav router');
  return res.status(200).json(res.locals.comments);
});
favRouter.patch('/comment', favController.editComment, (req, res) => {
  console.log('fav router');
  return res.status(200).json('Edited');
});

favRouter.post('/', favController.getFavs, (req, res) => {
  console.log('fav router');
  return res.status(200).json(res.locals.restaurants);
});
module.exports = favRouter;
