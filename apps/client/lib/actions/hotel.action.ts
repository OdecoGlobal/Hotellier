import { HotelBasicData } from '@hotellier/shared';
import { axiosInstance } from '../axios';

export async function createNewHotel(formData: HotelBasicData) {
  try {
    const res = await axiosInstance.post('/hotels', formData);
    if (!res) throw new Error('An error occured while creating Hotel');

    return {
      success: true,
      message: 'Hotel basic info updated successfully',
    };
  } catch (error) {
    console.log(error);
  }
}
