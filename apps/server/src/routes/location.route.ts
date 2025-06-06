import { Router } from 'express';
import {
  getAllCities,
  getAllCountries,
  getAllStates,
  getCitiesByState,
  getStatesByCountry,
} from '../controllers/location.controller';

const router = Router();

router.get('/countries', getAllCountries);
router.get('/countries/:countryId/states', getStatesByCountry);

router.get('/states', getAllStates);
router.get('/states/:stateId/cities', getCitiesByState);

router.get('/cities', getAllCities);

export default router;
