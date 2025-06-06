import { requireOwner } from '@/lib/auth-guard';
import { redirect } from 'next/navigation';

const BasicInfo = async () => {
  const session = await requireOwner();
  if (!session) redirect('/unauthorized');
  return <>Basic Info</>;
};

export default BasicInfo;
