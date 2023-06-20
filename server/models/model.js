const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  message: { type: String },
});

const favRestSchema = new Schema({
  restName: { type: String, required: true },
  image_url: { type: String },
  restId: { type: String },
  is_closed: { type: Boolean },
  location: { type: String },
  comments: [{ type: commentSchema, default: [] }],
});

const reservationSchema = new Schema({
  date: Date,
  time: String,
  size: String,
  location: String,
  name: String,
  image: String,
});

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  restaurants: [{ type: favRestSchema, default: [] }],
  reservations: [{ type: reservationSchema, default: [] }],
});

module.exports = mongoose.model('User', userSchema);
