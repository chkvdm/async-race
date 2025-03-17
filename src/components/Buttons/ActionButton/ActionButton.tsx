import { Button } from 'antd';

import styles from 'components/buttons/actionButton/actionButton.module.scss';

interface ActiveButtonProps {
  type?: 'primary';
  htmlType?: 'submit' | 'button';
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const ActionButton: React.FC<ActiveButtonProps> = ({
  type = 'primary',
  onClick,
  children,
  style,
  htmlType = 'submit',
  disabled,
}) => {
  return (
    <Button
      className={disabled ? styles.disabledButton : styles.activeButton}
      type={type}
      htmlType={htmlType}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
