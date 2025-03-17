import type { Rule } from 'antd/es/form';

const inputRules: Rule[] = [
  {
    required: true,
    message: 'Car is required',
  },
  {
    pattern: /^[A-Za-zА-Яа-яЁё]+\s+[A-Za-zА-Яа-яЁё0-9]+$/,
    message: 'Please input a car brand and car model',
  },
];

export default inputRules;
