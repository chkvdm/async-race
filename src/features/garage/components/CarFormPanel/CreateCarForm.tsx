import { useEffect } from 'react';
import { Form } from 'antd';

import { useAppDispatch, useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import { updateCreateCarForm, resetCreateCarForm } from '@garageFeatures/slices/garageSlice';
import { createCar, fetchCars } from '@garageFeatures/slices/garageThunks';
import inputRules from '@garageFeatures/utils/inputRules';
import ActionButton from 'components/Buttons/ActionButton/ActionButton';
import ControlledColorPicker from 'components/ColorPickers/ControlledColorPicker/ControlledColorPicker';
import TextInput from 'components/Inputs/TextInputs/TextInput';
import RaceStatus from '@raceFeatures/ts/enums/race.enums';

const CreateCarForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { createCarForm, currentPageNumber } = useAppSelector((state: RootState) => state.garage);
  const { status } = useAppSelector((state: RootState) => state.race);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(createCarForm);
  }, [createCarForm, form]);

  const handleFormChange = (changedValues: { name?: string; color?: string }): void => {
    dispatch(updateCreateCarForm(changedValues));
  };

  const handleSubmit = async (): Promise<void> => {
    dispatch(createCar(createCarForm))
      .unwrap()
      .then(() => {
        dispatch(resetCreateCarForm());
        dispatch(fetchCars(currentPageNumber));
      });
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={handleSubmit}
      disabled={!(status === RaceStatus.INITIAL)}
    >
      <Form.Item name="name" rules={inputRules} validateTrigger="onBlur">
        <TextInput onChange={(name) => handleFormChange({ name })} placeholder="e.g. lada vesta" />
      </Form.Item>

      <Form.Item name="color">
        <ControlledColorPicker
          value={createCarForm.color}
          onChange={(color) => handleFormChange({ color })}
        />
      </Form.Item>

      <Form.Item>
        <ActionButton type="primary" htmlType="submit">
          Create car
        </ActionButton>
      </Form.Item>
    </Form>
  );
};

export default CreateCarForm;
