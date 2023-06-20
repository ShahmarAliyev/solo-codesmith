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

favController.writeComment = async (req, res, next) => {
  console.log('fav controller, create fav');
  console.log(req.body, 'crate coment req body');
  const { comment, userId, restName } = req.body;
  // const { newComment } = comment;
  console.log(comment);
  try {
    const foundUser = await User.findById({ _id: userId });
    const rest = foundUser.restaurants.filter(
      (rest) => rest.restName === restName
    )[0];
    rest.comments.push({ message: comment });
    const updatedUser = await foundUser.save();
    console.log(updatedUser);
    const updatedComments = rest.comments;
    console.log('comments array: ', updatedComments);
    res.locals.comments = updatedComments;
    return next();
  } catch (error) {
    console.log(error);
  }
};
favController.editComment = async (req, res, next) => {
  const { comment, userId, commentId, restName } = req.body;

  try {
    const foundUser = await User.findById({ _id: userId });
    const rest = foundUser.restaurants.filter(
      (rest) => rest.restName === restName
    )[0];
    for (let i = 0; i < rest.comments.length; i++) {
      if (res.comments[i]._id === commentId) {
        res.comments[i].message = comment;
        break;
      }
    }
    const updatedUser = await foundUser.save();
    console.log(updatedUser);
    return next();
  } catch (error) {}
};
module.exports = favController;
