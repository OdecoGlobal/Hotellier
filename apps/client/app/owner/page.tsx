import CreateHotelButton from '@/components/shared/owner/create-hotel-button';
import { requireOwner } from '@/lib/auth-guard';
import { redirect } from 'next/navigation';

const OwnersHomePage = async () => {
  const session = await requireOwner();
  if (!session) redirect('/unauthorized');
  return (
    <div>
      <CreateHotelButton />
    </div>
  );
};

export default OwnersHomePage;
