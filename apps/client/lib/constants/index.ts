export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Hotellier';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'Modern Hotel listing web app built with Next.js';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const hotelTypes = [
  {
    value: 'HOTEL',
    text: 'Hotel',
  },
  {
    value: 'MOTEL',
    text: 'Motel',
  },
  {
    value: 'GUESTHOUSE',
    text: 'Guest House',
  },
  {
    value: 'APARTMENT',
    text: 'Apartment',
  },
  {
    value: 'INN',
    text: 'Inn',
  },
];

export const currency = [
  {
    value: 'NGN',
    text: 'Naira',
  },
  {
    value: 'USD',
    text: 'US Dollar',
  },
  {
    value: 'EUR',
    text: 'Euros',
  },
  {
    value: 'GBP',
    text: 'British Pounds Sterling',
  },
];

export const steps = [
  'Basic Info',
  'Policies',
  'Photos',
  'Rooms and Rates',
  'Amenities',
  'Review',
];
