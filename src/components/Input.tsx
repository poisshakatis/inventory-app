import { ErrorMessage } from '@hookform/error-message';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

interface Props {
  type?: string;
  name: string;
  label: string;
}

export default function Input({ type = 'text', name, label }: Props) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Form.Group className='mb-3'>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} {...register(name)} />

      <ErrorMessage errors={errors} name={name} />
    </Form.Group>
  );
}