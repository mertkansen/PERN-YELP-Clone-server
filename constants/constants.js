//TABLES
const RESTAURANTS = "restaurants";
const REVIEWS = "reviews";

// RESTAURANTS

const GET_WITH_ID = `SELECT * FROM ${RESTAURANTS} WHERE id = $1`;
const GET_WITH_LOCATION = `SELECT * FROM ${RESTAURANTS} WHERE location = $1`;
const GET_WITH_PRICE_RANGE = `SELECT * FROM ${RESTAURANTS} WHERE price_range = $1`;
const INSERT_ONE = `INSERT INTO ${RESTAURANTS} (name, location, price_range) VALUES ($1, $2, $3) RETURNING *`;
const UPDATE_RESTAURANT = `UPDATE ${RESTAURANTS} SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *`;

const DELETE_REVİEW = `DELETE FROM ${REVIEWS} WHERE restaurant_id = $1`;
const DELETE_RESTAURANT = `DELETE FROM ${RESTAURANTS} WHERE id = $1`;

// REVIEWS
const GET_REVIEW = `SELECT * FROM ${REVIEWS} WHERE restaurant_id = $1`;
const INSERT_REVIEW = `INSERT INTO ${REVIEWS} (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *`;

// AGGREGATE
const GET_AVG_COUNT = `select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id`;

const GET_AVG_COUNT_FOR_ONE = `select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;`;

export {
  GET_WITH_ID,
  INSERT_ONE,
  GET_WITH_LOCATION,
  GET_WITH_PRICE_RANGE,
  UPDATE_RESTAURANT,
  DELETE_RESTAURANT,
  GET_REVIEW,
  INSERT_REVIEW,
  GET_AVG_COUNT,
  GET_AVG_COUNT_FOR_ONE,
  DELETE_REVİEW,
};
