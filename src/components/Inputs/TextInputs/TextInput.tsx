import { Input } from 'antd';

import styles from 'components/Inputs/TextInputs/textInput.module.scss';

interface ActiveInputProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ActiveInput: React.FC<ActiveInputProps> = ({ placeholder, value, onChange, onBlur }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <Input
      className={styles.activeInput}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
    />
  );
};

export default ActiveInput;
