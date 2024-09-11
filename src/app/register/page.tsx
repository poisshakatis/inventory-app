'use client';

import Input from '@/components/Input';
import { NAME_LENGTH, PASSWORD_LENGTH } from '@/constants/lengths';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants/regexes';
import RegisterInfo from '@/dtos/register.dto';
import AccountService from '@/services/AccountService';
import { useUser } from '@/UserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { object, ref, string } from 'yup';

const schema = object({
  email: string()
    .required('Email is required')
    .matches(
      EMAIL_REGEX,
      'Incorrect email'
    ),
  password: string()
    .required('Password is required')
    .min(
      PASSWORD_LENGTH,
      `Password must be at least ${PASSWORD_LENGTH} characters`
    )
    .matches(
      PASSWORD_REGEX,
      'Password should contain a lowercase, an uppercase character, a digit and a special character'
    ),
  confirmPassword: string()
    .required('Password must be confirmed')
    .oneOf(
      [ref('password')],
      'Passwords must match'
    ),
  firstName: string()
    .required('First name is required')
    .max(
      NAME_LENGTH,
      `First name must be at most ${NAME_LENGTH} characters`
    ),
  lastName: string()
    .required('Last name is required')
    .max(
      NAME_LENGTH,
      `Last name must be at most ${NAME_LENGTH} characters`
    )
});

export default function Register() {
  const methods = useForm<RegisterInfo>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const router = useRouter();
  const { setUser } = useUser();

  const onSubmit = async (data: RegisterInfo) => {
    const response = await new AccountService().register(data);
    
    if (response.data) {
      setUser(response.data);
      router.push('/');
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='row col-md-4'>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h2>Create a new account.</h2>
          <hr />

          <Input
            name='firstName'
            type='text'
            label='First Name' />

          <Input
            name='lastName'
            type='text'
            label='Last Name' />

          <Input
            name='email'
            type='email'
            label='Email' />

          <Input
            name='password'
            type='password'
            label='Password' />

          <Input
            name='confirmPassword'
            type='password'
            label='Confirm Password' />

          <button
            className='w-100 btn btn-lg btn-primary'
            type='submit'>
            Register
          </button>
        </form>
      </div>
    </FormProvider>
  );
}