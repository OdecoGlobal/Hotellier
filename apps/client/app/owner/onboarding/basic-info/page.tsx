import MainBasicInfoPage from '@/components/shared/owner/hotel/basic-info';
import { requireOwner } from '@/lib/auth-guard';

const BasicInfoPage = async () => {
  const owner = await requireOwner();
  return <MainBasicInfoPage role={owner.user.role as 'OWNER'} />;
};

export default BasicInfoPage;
