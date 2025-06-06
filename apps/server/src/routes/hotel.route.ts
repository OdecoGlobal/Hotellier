import express from 'express';
import {
  addHotelImages,
  addRoom,
  createHotel,
  deleteHotel,
  // getAllHotels,
  getHotelById,
  updateHotelBasicInfo,
  updatePolicies,
  // getHotelBySlug,
  // updateHotel,
} from '../controllers/hotel.controller';
import {
  protect,
  restrictTo,
  validateHotelOwnerShip,
} from '../controllers/auth.controller';
import {
  resizeAndUploadHotelsImages,
  uploadHotelsImages,
} from '../controllers/images.controller';
import { getHotelRoom } from '../controllers/room.controller';

const router = express.Router();
router
  .route('/')
  // .get(getAllHotels)
  .post(protect, restrictTo('OWNER'), createHotel);

router
  .route('/:hotelId')
  .get(getHotelById)
  // .patch(protect, restrictTo('OWNER'), updateHotel)
  .delete(protect, restrictTo('OWNER'), deleteHotel);

router
  .route('/:hotelId/images')
  .post(uploadHotelsImages, resizeAndUploadHotelsImages, addHotelImages);

router
  .route('/:hotelId/rooms')
  .get(getHotelRoom)
  .post(validateHotelOwnerShip, addRoom);

router.put(
  '/:hotelId/basic-info',
  protect,
  restrictTo('OWNER'),
  validateHotelOwnerShip,
  updateHotelBasicInfo
);
router.put(
  '/:hotelId/policies',
  protect,
  restrictTo('OWNER'),
  validateHotelOwnerShip,
  updatePolicies
);

export default router;
