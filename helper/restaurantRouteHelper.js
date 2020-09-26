import { query } from "../db/pg.js";
import {
  INSERT_ONE,
  UPDATE_RESTAURANT,
  DELETE_RESTAURANT,
  GET_REVIEW,
  INSERT_REVIEW,
  GET_AVG_COUNT,
  GET_AVG_COUNT_FOR_ONE,
  DELETE_REVİEW,
} from "../constants/constants.js";

export const getAllRestaurants = async (req, res) => {
  try {
    const results = await query(GET_AVG_COUNT);

    res.status(200).json({
      status: "success",
      method: "get",
      resultsCount: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
};

export const getRestaurantWithID = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const results = await query(GET_AVG_COUNT_FOR_ONE, [restaurantId]);
    const reviews = await query(GET_REVIEW, [restaurantId]);

    res.status(200).json({
      status: "success",
      method: "get",
      data: {
        restaurant: results.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
};

export const createRestaurant = async (req, res) => {
  const { name, location, price_range } = req.body;

  try {
    const results = await query(INSERT_ONE, [name, location, price_range]);

    res.status(201).json({
      status: "success",
      method: "post",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const updateRestaurant = async (req, res) => {
  const { name, location, price_range } = req.body;
  const { restaurantId } = req.params;

  try {
    const results = await query(UPDATE_RESTAURANT, [
      name,
      location,
      price_range,
      restaurantId,
    ]);

    res.status(201).json({
      status: "success",
      method: "put",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const deleteRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    // Because of Primary Key Foreign Key Relation, first delete from reviews then delete from results
    const reviews = await query(DELETE_REVİEW, [restaurantId]);
    const results = await query(DELETE_RESTAURANT, [restaurantId]);

    res.status(201).json({
      status: "success",
      method: "delete",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const addReview = async (req, res) => {
  const { restaurantId } = req.params;
  const { name, review, rating } = req.body;

  try {
    const results = await query(INSERT_REVIEW, [
      restaurantId,
      name,
      review,
      rating,
    ]);

    res.status(201).send({
      status: "success",
      data: {
        review: results.rows[0],
      },
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
