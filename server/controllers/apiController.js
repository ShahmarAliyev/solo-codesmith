const axios = require('axios');
const apiController = {};

const yelpBaseUrl = 'https://api.yelp.com/v3/businesses/search';
const AUTH_TOKEN =
  'Bearer D25yzICaYtRniFGYBVsGFpGRSgQZyq7bMhlzMdhF0CxdWOakQ6CpsrJMbla7D43iAmLUjwDYeGyBW2S9Vc3ptgBNrIqtfG5Xuk8x6d6qhcadG3iOi7KkA3VtG_9UZHYx';
apiController.getRestaurants = async (req, res, next) => {
  console.log('get rest controller');
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
  } catch (error) {
    console.log('get rest controller err: ', error.message);
  }
};

apiController.searchRestaurants = async (req, res, next) => {
  const { location, keyword } = req.body;
  console.log('location, keyword', location, keyword);
  console.log('search res controller');
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
  } catch (error) {
    console.log('search rest controller err: ', error.message);
  }
};

apiController.findOneRest = async (req, res, next) => {
  console.log('find one res controller');
  const { restId } = req.body;
  console.log('restid, ', restId);
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
    console.log('result.data ', result.data);
    return next();
  } catch (error) {
    console.log('find one res control err', error.message);
  }
};

module.exports = apiController;
