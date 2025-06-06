'use client';

import { HotelBasicInfoData } from '@/lib/types';
import {
  hotelBasicInfoStepOneSchema,
  hotelBasicInfoStepTwoSchema,
} from '@/lib/validator';
import { hotelBasicInfoSchema } from '@hotellier/shared';
import { useState } from 'react';
import { z } from 'zod';
import HotelBasicInfoStepOne from './basic-info-step-one';
import HotelBasicInfoStepTwo from './basic-info-step-two';

const MainBasicInfoPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<
    z.infer<typeof hotelBasicInfoSchema>
  >({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    lng: 0,
    lat: 0,
    hotelType: 'HOTEL',
    roomUnitTotal: 1,
    acceptedCurrency: 'NGN',
  });

  const handleNextOne = (data: Partial<HotelBasicInfoData>) => {
    const result = hotelBasicInfoStepOneSchema.safeParse(data);
    if (!result.success) return;
    setFormData(prev => ({ ...prev, ...data }));
    setStep(2);
  };
  const handleNextTwo = (data: Partial<HotelBasicInfoData>) => {
    const result = hotelBasicInfoStepTwoSchema.safeParse(data);
    if (!result.success) return;
    setFormData(prev => ({ ...prev, ...data }));
    console.log(formData);
    setStep(3);
  };
  const handlePreviousTwo = (data: Partial<HotelBasicInfoData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    console.log(formData);
    setStep(1);
  };

  return (
    <section>
      {step === 1 && (
        <HotelBasicInfoStepOne
          defaultValues={formData}
          onNext={handleNextOne}
        />
      )}
      {step === 2 && (
        <HotelBasicInfoStepTwo
          defaultValues={formData}
          onNext={handleNextTwo}
          onPrevious={handlePreviousTwo}
        />
      )}
    </section>
  );
};

export default MainBasicInfoPage;
