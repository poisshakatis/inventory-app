'use client';

import AccountService from '@/services/AccountService';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useUser } from '@/UserContext';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants/regexes';
import { PASSWORD_LENGTH } from '@/constants/lengths';
import LoginInfo from '@/dtos/login.dto';
import Input from '@/components/Input';

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
    )
});

export default function Login() {    
  const methods = useForm<LoginInfo>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const [validationError, setvalidationError] = useState('');
  const router = useRouter();
  const { setUser } = useUser();

  const onSubmit = async (data: LoginInfo) => {
    const response = await new AccountService().login(data);
    
    if (response.data) {
      setUser(response.data);
      router.push('/');
    }

    if (response.errors) {
      setvalidationError('Invalid login attempt');
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='row col-md-4'>
        <h2>Log in</h2>
        <hr />
        <div className='text-danger'>
          {validationError}
        </div>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name='email'
            type='email'
            label='Email' />

          <Input
            name='password'
            type='password'
            label='Password' />

          <button
            className='w-100 btn btn-lg btn-primary'
            type='submit'>
            Log in
          </button>
        </form>
      </div>
    </FormProvider>
  );
}