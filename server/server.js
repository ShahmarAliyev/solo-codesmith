const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const apiRouter = require('./routes/apiRouter');
const signupRouter = require('./routes/signupRouter');
const favRouter = require('./routes/favRouter');
const reservationRouter = require('./routes/reservation');
const signinRouter = require('./routes/signinRouter');

const app = express();
const PORT = 8080;

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(bodyParser.json());
app.use(express.json());

async function runMongoConnection() {
  const MONGO_URL =
    'mongodb+srv://shahmar:shahmar@solo.qknsilk.mongodb.net/?retryWrites=true&w=majority';
  await mongoose.connect(MONGO_URL);
  console.log('Connected to mongoDB with mongoose');
}
runMongoConnection();
// app.use('/details', apiRouter);

app.use('/api', apiRouter);
app.use('/api/favourites', favRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/signup', signupRouter);
app.use('/api/signin', signinRouter);

app.listen(PORT, () => {
  console.log('Connected to server at port 8080');
});

module.exports = app;
