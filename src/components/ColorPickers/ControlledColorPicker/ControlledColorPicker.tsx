import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';

import styles from 'components/ColorPickers/ControlledColorPicker/controlledColorPicker.module.scss';

interface ControlledColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const ControlledColorPicker: React.FC<ControlledColorPickerProps> = ({ value, onChange }) => {
  const handleColorChange = (color: Color): void => {
    if (onChange) {
      onChange(color.toHexString());
    }
  };

  return (
    <ColorPicker className={styles.activeColorPicker} value={value} onChange={handleColorChange} />
  );
};

export default ControlledColorPicker;
