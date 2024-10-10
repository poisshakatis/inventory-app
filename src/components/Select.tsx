import OptionData from '@/interfaces/OptionData';
import { Form } from 'react-bootstrap';
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
    <Form.Group className='mb-3'>
      <Form.Label>{label}</Form.Label>
      <Form.Select {...register(name)}>
        { isOptional && <option></option> }
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}