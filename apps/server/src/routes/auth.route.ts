import express from 'express';
import {
  login,
  logout,
  signUp,
  signUpHotelOwners,
  verifiedToken,
} from '../controllers/auth.controller';

const router = express.Router();
router.post('/signup', signUp);
router.get('/verify', verifiedToken);
router.post('/signup-owner', signUpHotelOwners);
router.post('/login', login);
router.post('/logout', logout);

export default router;
