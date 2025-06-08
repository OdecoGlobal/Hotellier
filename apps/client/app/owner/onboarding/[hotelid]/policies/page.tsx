import IndexPolicyForm from '@/components/shared/hotel/policies';
import { requireOwner } from '@/lib/auth-guard';
import { redirect } from 'next/navigation';

const OwnerPoliciesOnboardingPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const owner = requireOwner();
  if (!owner) redirect('/unauthorized');
  const { hotelId } = await params;
  return <IndexPolicyForm hotelId={hotelId} />;
};

export default OwnerPoliciesOnboardingPage;
