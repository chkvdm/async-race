import { notification } from 'antd';

export const errorAlert = (error: string): void => {
  notification.error({
    message: 'Oooops...',
    description: error,
    placement: 'topRight',
  });
};
