'use client';
import { Button } from '@/components/ui/button';
// import { createNewHotel } from '@/lib/actions/hotel.action';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreateHotelButton = () => {
  const router = useRouter();

  const handleCreateHotel = async () => {
    router.push('/owner/onboarding/basic-info');
  };

  return (
    <Button onClick={handleCreateHotel}>
      <Plus /> Create New Hotel
    </Button>
  );
};

export default CreateHotelButton;
