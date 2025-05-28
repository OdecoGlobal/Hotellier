import express from "express";
import {
  createHotel,
  getAllHotels,
  getHotelById,
  getHotelBySlug,
} from "../controllers/hotel.controller";
import { protect, restrictTo } from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/")
  .get(getAllHotels)
  .post(protect, restrictTo("OWNER"), createHotel);

router.get("/:hotelId", getHotelById);
router.get("/slug/:slug", getHotelBySlug);

export default router;
