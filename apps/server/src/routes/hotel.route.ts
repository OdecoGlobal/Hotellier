import express from 'express';
import {
  addHotelImages,
  addRoom,
  createHotel,
  deleteHotel,
  // getAllHotels,
  getHotelById,
  getOwnerHotel,
  updateHotelBasicInfo,
  updatePolicies,
  // getHotelBySlug,
  // updateHotel,
} from '../controllers/hotel.controller';
import {
  protect,
  restrictTo,
  validateHotelAccess,
} from '../controllers/auth.controller';
import {
  resizeAndUploadHotelsImages,
  uploadHotelsImages,
} from '../controllers/images.controller';
import { getHotelRoom } from '../controllers/room.controller';

const router = express.Router();
router.route('/').post(protect, restrictTo('OWNER', 'ADMIN'), createHotel);

router.get(
  '/onboard/owner',
  protect,
  restrictTo('OWNER', 'ADMIN'),
  getOwnerHotel
);
router
  .route('/:hotelId')
  .get(getHotelById)
  // .patch(protect, restrictTo('OWNER'), updateHotel)
  .delete(
    protect,
    restrictTo('OWNER', 'ADMIN'),
    validateHotelAccess(),
    deleteHotel
  );

router
  .route('/:hotelId/images')
  .post(uploadHotelsImages, resizeAndUploadHotelsImages, addHotelImages);

router
  .route('/:hotelId/rooms')
  .get(getHotelRoom)
  .post(validateHotelAccess(), addRoom);

router.put(
  '/:hotelId/basic-info',
  protect,
  restrictTo('OWNER'),
  validateHotelAccess(),
  updateHotelBasicInfo
);
router.put(
  '/:hotelId/policies',
  protect,
  restrictTo('OWNER'),
  validateHotelAccess(),
  updatePolicies
);

export default router;
