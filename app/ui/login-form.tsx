'use client';

import { useUser } from '@/context/AuthContext';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Must be at least 6 characters long'),
});

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string[] | undefined;
    password?: string[] | undefined;
  }>();
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { login } = useUser();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors(undefined);
    setMessage('');

    const response = await fetch('/api/auth/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result)
      login(result);
      router.replace('/');
    } else {
      setMessage((await response.json()).error);
    }
  }

  return (
    <form className='flex flex-col gap-4 py-8' onSubmit={handleSubmit}>
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        isInvalid={!!errors?.email}
        errorMessage={errors?.email}
      />
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        isInvalid={!!errors?.password}
        errorMessage={errors?.password}
      />

      <p aria-live="polite">{message}</p>
      <Button type="submit">Log In</Button>
    </form>
  );
}