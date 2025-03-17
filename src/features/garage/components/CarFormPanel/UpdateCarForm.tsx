import { useEffect } from 'react';
import { Form, Input } from 'antd';

import { useAppDispatch, useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import { updateEditCarForm, resetEditCarForm } from '@garageFeatures/slices/garageSlice';
import { updateCar, fetchCars } from '@garageFeatures/slices/garageThunks';
import inputRules from '@garageFeatures/utils/inputRules';
import ActionButton from 'components/Buttons/ActionButton/ActionButton';
import ControlledColorPicker from 'components/ColorPickers/ControlledColorPicker/ControlledColorPicker';
import TextInput from 'components/Inputs/TextInputs/TextInput';

const UpdateCarForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { editCarForm, currentPageNumber } = useAppSelector((state: RootState) => state.garage);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editCarForm.id) {
      form.setFieldsValue(editCarForm);
    } else {
      form.resetFields();
    }
  }, [editCarForm, form]);

  const handleFormChange = (changedValues: { name?: string; color?: string }): void => {
    const updatedForm = { ...editCarForm, ...changedValues };
    dispatch(updateEditCarForm(updatedForm));
  };

  const handleSubmit = async (): Promise<void> => {
    dispatch(updateCar(editCarForm))
      .unwrap()
      .then(() => {
        dispatch(resetEditCarForm());
        dispatch(fetchCars(currentPageNumber));
      });
  };

  return (
    <Form form={form} layout="inline" onFinish={handleSubmit} disabled={!editCarForm.id}>
      <Form.Item name="id" noStyle>
        <Input type="hidden" />
      </Form.Item>

      <Form.Item name="name" rules={inputRules} validateTrigger="onBlur">
        <TextInput onChange={(name) => handleFormChange({ name })} />
      </Form.Item>

      <Form.Item name="color">
        <ControlledColorPicker
          value={editCarForm.color}
          onChange={(color) => handleFormChange({ color })}
        />
      </Form.Item>

      <Form.Item>
        <ActionButton>Update car</ActionButton>
      </Form.Item>
    </Form>
  );
};

export default UpdateCarForm;
