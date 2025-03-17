import { notification } from 'antd';

const successAlert = ({ message, description }: { message: string; description: string }): void => {
  notification.success({
    message,
    description,
    placement: 'topRight',
  });
};

export default successAlert;
