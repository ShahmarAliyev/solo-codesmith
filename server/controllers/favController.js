const axios = require('axios');
const User = require('../models/model');

const favController = {};

favController.addFav = async (req, res, next) => {
  console.log('fav controller, add fav');
  const { rest, userId } = req.body;
  console.log('reqbody, add fav', req.body);
  const { name, image_url, id, is_closed, location } = rest;
  const adress = location['address1'] + ', ' + location['city'];
  let newRest = {
    restName: name,
    image_url,
    restId: id,
    is_closed,
    location: adress,
  };
  try {
    const newFavRest = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { restaurants: newRest } },
      {
        new: true,
      }
    );
    res.locals.restaurants = newFavRest.restaurants;
    console.log('newfavrest ', newFavRest);
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

favController.getFavs = async (req, res, next) => {
  console.log('fav controller, get favs');
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    console.log('fav arr ', user.restaurants);
    res.locals.restaurants = user.restaurants;
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = favController;
