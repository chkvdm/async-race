import type { Rule } from 'antd/es/form';

const inputRules: Rule[] = [
  {
    required: true,
    message: 'Car is required',
  },
  {
    pattern: /^[A-Za-zА-Яа-яЁё0-9\s]+$/,
    message: 'Please, use only letters (A-Z, А-Я) and numbers.',
  },
  {
    max: 20,
    message: 'Max. 20 characters',
  },
];

export default inputRules;
