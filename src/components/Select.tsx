import OptionData from '@/interfaces/OptionData';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  options: OptionData[];
  isOptional?: boolean;
}

export default function Select({ name, label, options, isOptional = true }: Props) {
  const { register } = useFormContext();

  return (
    <div className='dropdownField'>
      <label htmlFor={name}>{label}</label>
      <select id={name} className='styled-select' {...register(name)}>
        { isOptional && <option></option> }
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}