import IndexPolicyComponent from '@/components/shared/owner/hotel/policies';
import { requireOwner } from '@/lib/auth-guard';
import { redirect } from 'next/navigation';

const OwnerPoliciesOnboardingPage = () => {
  const owner = requireOwner();
  if (!owner) redirect('/unauthorized');
  return <IndexPolicyComponent />;
};

export default OwnerPoliciesOnboardingPage;
