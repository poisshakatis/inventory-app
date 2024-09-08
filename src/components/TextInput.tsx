import { ErrorMessage } from '@hookform/error-message';
import { useController, useFormContext } from 'react-hook-form';

interface Props {
  type?: string;
  name: string;
  label: string;
}

export default function TextInput({ type = 'text', name, label }: Props) {
  const { control, formState: { errors } } = useFormContext();

  const { field: { value, onChange, onBlur } } = useController({ control, name, defaultValue: '' });

  return (
    <div className='form-floating mb-3'>
      <input
        className='form-control'
        name={name}
        id={name}
        type={type}
        value={value}
        placeholder=''
        onChange={onChange}
        onBlur={onBlur} />
      <label htmlFor={name}>{label}</label>

      <ErrorMessage errors={errors} name={name} />
    </div>
  );
}