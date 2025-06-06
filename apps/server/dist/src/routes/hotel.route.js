"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotel_controller_1 = require("../controllers/hotel.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const images_controller_1 = require("../controllers/images.controller");
const room_controller_1 = require("../controllers/room.controller");
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
router
    .route('/:hotelId/images')
    .post(images_controller_1.uploadHotelsImages, images_controller_1.resizeAndUploadHotelsImages, hotel_controller_1.addHotelImages);
router
    .route('/:hotelId/rooms')
    .get(room_controller_1.getHotelRoom)
    .post(auth_controller_1.validateHotelOwnerShip, hotel_controller_1.addRoom);
router.put('/:hotelId/basic-info', auth_controller_1.protect, (0, auth_controller_1.restrictTo)('OWNER'), auth_controller_1.validateHotelOwnerShip, hotel_controller_1.updateHotelBasicInfo);
router.put('/:hotelId/policies', auth_controller_1.protect, (0, auth_controller_1.restrictTo)('OWNER'), auth_controller_1.validateHotelOwnerShip, hotel_controller_1.updatePolicies);
exports.default = router;
