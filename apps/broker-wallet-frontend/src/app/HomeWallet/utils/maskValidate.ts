import { ControllerRenderProps } from 'react-hook-form';
import { IFormInputsAccount } from '../components';

export const maskAgency = (
  value: string,
  field: ControllerRenderProps<Partial<IFormInputsAccount>, 'bankAg'>,
  mask: string
) => {
  if (value.length > mask.length) {
    return;
  }

  const numbers = mask.split('').filter((char) => char === '9').length;
  const separators = mask.split('').filter((char) => char === '-').length;
  const chars = mask.split('').filter((char) => char === '*').length;

  if (value.length < numbers + 1) {
    field.onChange(value.replace(/[^0-9]/g, ''));
  } else {
    field.onChange(
      value.replace(
        new RegExp(`([0-9]{${numbers}})([0-9]{${chars}})`),
        `$1${separators > 0 ? '-' : ''}$2`
      )
    );
  }
};

export const maskAccount = (
  value: string,
  field: ControllerRenderProps<Partial<IFormInputsAccount>, 'bankCC'>,
  mask: string
) => {
  if (value.length > mask.length) {
    return;
  }

  const numbers = mask.split('').filter((char) => char === '9').length;
  const separators = mask.split('').filter((char) => char === '-').length;
  const chars = mask.split('').filter((char) => char === '*').length;

  if (value.length < numbers + 1) {
    field.onChange(value.replace(/[^0-9]/g, ''));
  } else {
    field.onChange(
      value.replace(
        new RegExp(`([0-9]{${numbers}})([0-9]{${chars}})`),
        `$1${separators > 0 ? '-' : ''}$2`
      )
    );
  }
};
