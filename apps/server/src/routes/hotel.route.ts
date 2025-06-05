import express from 'express';
import {
  createHotel,
  deleteHotel,
  // getAllHotels,
  getHotelById,
  updateHotelBasicInfo,
  // getHotelBySlug,
  // updateHotel,
} from '../controllers/hotel.controller';
import {
  protect,
  restrictTo,
  validateHotelOwnerShip,
} from '../controllers/auth.controller';

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

// router.get('/slug/:slug', getHotelBySlug);

router.put(
  '/:hotelId/basic-info',
  protect,
  restrictTo('OWNER'),
  validateHotelOwnerShip,
  updateHotelBasicInfo
);

export default router;
