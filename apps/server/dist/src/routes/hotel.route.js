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
    .route('/')
    // .get(getAllHotels)
    .post(auth_controller_1.protect, (0, auth_controller_1.restrictTo)('OWNER'), hotel_controller_1.createHotel);
router
    .route('/:hotelId')
    .get(hotel_controller_1.getHotelById)
    // .patch(protect, restrictTo('OWNER'), updateHotel)
    .delete(auth_controller_1.protect, (0, auth_controller_1.restrictTo)('OWNER'), hotel_controller_1.deleteHotel);
// router.get('/slug/:slug', getHotelBySlug);
router.put('/:hotelId/basic-info', auth_controller_1.protect, (0, auth_controller_1.restrictTo)('OWNER'), auth_controller_1.validateHotelOwnerShip, hotel_controller_1.updateHotelBasicInfo);
exports.default = router;
