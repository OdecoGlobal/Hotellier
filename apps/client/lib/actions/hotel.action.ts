import { HotelBasicData } from '@hotellier/shared';
import { axiosInstance } from '../axios';
import { formatError } from '../utils';
import { CreateHotelApiResponse, IncompleteHotelApiResponse } from '@/types';

export async function createNewHotel(formData: HotelBasicData) {
  try {
    const res = await axiosInstance.post<CreateHotelApiResponse>(
      '/hotels',
      formData
    );
    if (!res) throw new Error('An error occured while creating Hotel');

    return {
      success: true,
      message: 'Hotel basic info updated successfully',
      hotel: res.data.data.hotel,
    };
  } catch (error) {
    console.log(formatError(error));
    return { success: false, message: formatError(error) };
  }
}

export async function getIncompleteHotels(): Promise<IncompleteHotelApiResponse> {
  try {
    const res = await axiosInstance('hotels/onboard/owner');
    if (res.status !== 200) {
      throw new Error('Error fetching countries');
    }
    return res.data;
  } catch (error) {
    console.log(formatError(error));
    return {
      data: [],
      status: 'error',
    };
  }
}
