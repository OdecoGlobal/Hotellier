"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotel_controller_1 = require("../controllers/hotel.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router
    .route("/")
    .get(hotel_controller_1.getAllHotels)
    .post(auth_controller_1.protect, (0, auth_controller_1.restrictTo)("OWNER"), hotel_controller_1.createHotel);
router.get("/:hotelId", hotel_controller_1.getHotelById);
router.get("/slug/:slug", hotel_controller_1.getHotelBySlug);
exports.default = router;
