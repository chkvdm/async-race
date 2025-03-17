import CreateCarForm from '@garageFeatures/components/CarFormPanel/CreateCarForm';
import UpdateCarForm from '@garageFeatures/components/CarFormPanel/UpdateCarForm';

const CarFormsPanel: React.FC = () => {
  return (
    <>
      <CreateCarForm />
      <UpdateCarForm />
    </>
  );
};

export default CarFormsPanel;
