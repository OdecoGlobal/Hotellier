import { hotelBasicInfoSchema } from '@hotellier/shared';

export const hotelBasicInfoStepOneSchema = hotelBasicInfoSchema.pick({
  name: true,
  hotelType: true,
  roomUnitTotal: true,
  acceptedCurrency: true,
});

export const hotelBasicInfoStepTwoSchema = hotelBasicInfoSchema.pick({
  address: true,
  city: true,
  state: true,
  country: true,
  zipCode: true,
});
export const hotelBasicInfoStepThreeSchema = hotelBasicInfoSchema.pick({
  lng: true,
  lat: true,
});
