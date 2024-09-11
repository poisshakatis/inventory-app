import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

interface Props {
  type?: string;
  name: string;
  label: string;
}

export default function Input({ type = 'text', name, label }: Props) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className='form-floating mb-3'>
      <input
        className='form-control'
        id={name}
        type={type}
        {...register(name)} />
      <label htmlFor={name}>{label}</label>

      <ErrorMessage errors={errors} name={name} />
    </div>
  );
}