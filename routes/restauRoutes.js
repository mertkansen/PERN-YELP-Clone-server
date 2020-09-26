import express from "express";
import {
  getAllRestaurants,
  getRestaurantWithID,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addReview,
} from "../helper/restaurantRouteHelper.js";

export const router = express.Router();

// GET

router.get("/", getAllRestaurants);
router.get("/:restaurantId", getRestaurantWithID);

// POST

router.post("/", createRestaurant);
router.post("/:restaurantId/addReview", addReview);

// PUT

router.put("/:restaurantId", updateRestaurant);

// DELETE

router.delete("/:restaurantId", deleteRestaurant);
