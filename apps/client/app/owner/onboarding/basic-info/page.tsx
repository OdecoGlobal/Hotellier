import HotelCreationSteps from '@/components/shared/owner/hotel/creation-steps';
import MainBasicInfoPage from './main';

const BasicInfoPage = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-10 gap-4">
      <div className="col-span-2">
        <HotelCreationSteps current={0} />
      </div>
      <div className="col-span-8">
        <MainBasicInfoPage />
      </div>
    </section>
  );
};

export default BasicInfoPage;
