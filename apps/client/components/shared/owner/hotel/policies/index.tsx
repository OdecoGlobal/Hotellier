import HotelCreationSteps from '../creation-steps';

const IndexPolicyComponent = () => {
  return (
    <section className=" flex flex-col md:flex-row ">
      <div>
        <HotelCreationSteps current={1} />
      </div>
    </section>
  );
};

export default IndexPolicyComponent;
