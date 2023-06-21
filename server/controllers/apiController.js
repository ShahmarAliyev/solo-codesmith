const axios = require('axios');
const apiController = {};

const yelpBaseUrl = 'https://api.yelp.com/v3/businesses/search';
const AUTH_TOKEN =
  'Bearer D25yzICaYtRniFGYBVsGFpGRSgQZyq7bMhlzMdhF0CxdWOakQ6CpsrJMbla7D43iAmLUjwDYeGyBW2S9Vc3ptgBNrIqtfG5Xuk8x6d6qhcadG3iOi7KkA3VtG_9UZHYx';
apiController.getRestaurants = async (req, res, next) => {
  try {
    const results = await axios.get(yelpBaseUrl, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
      params: {
        limit: 50,
        term: '',
        location: 'san jose',
      },
    });
    res.locals.restaurants = results.data.businesses;
    return next();
  } catch (error) {}
};

apiController.searchRestaurants = async (req, res, next) => {
  const { location, keyword } = req.body;
  try {
    const results = await axios.get(yelpBaseUrl, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
      params: {
        limit: 10,
        term: keyword,
        location,
      },
    });
    res.locals.restaurants = results.data.businesses;
    return next();
  } catch (error) {}
};

apiController.findOneRest = async (req, res, next) => {
  const { restId } = req.body;
  try {
    const result = await axios.get(
      `https://api.yelp.com/v3/businesses/${restId}`,
      {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }
    );
    res.locals.restaurant = result.data;
    return next();
  } catch (error) {}
};

module.exports = apiController;
