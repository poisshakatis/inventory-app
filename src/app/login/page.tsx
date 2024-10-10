'use client';

import AccountService from '@/services/AccountService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useUser } from '@/UserContext';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants/regexes';
import { PASSWORD_LENGTH } from '@/constants/lengths';
import LoginInfo from '@/dtos/login.dto';
import Input from '@/components/Input';
import { Button, Form } from 'react-bootstrap';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string()
    .min(1, 'Required')
    .regex(EMAIL_REGEX, 'Incorrect email'),
  password: z.string()
    .min(PASSWORD_LENGTH,
      `Password must be at least ${PASSWORD_LENGTH} characters`)
    .regex(PASSWORD_REGEX,
      'Password should contain a lowercase, an uppercase character, a digit and a special character')
});

export default function Login() {
  const methods = useForm<LoginInfo>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  });

  const [validationError, setvalidationError] = useState('');
  const router = useRouter();
  const { setUser } = useUser();

  const onSubmit = async (data: LoginInfo) => {
    const response = await new AccountService().login(data);
    console.log(response)

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
        <Form
          onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name='email'
            type='email'
            label='Email' />

          <Input
            name='password'
            type='password'
            label='Password' />

          <Button type='submit'>
            Log in
          </Button>
        </Form>
      </div>
    </FormProvider>
  );
}