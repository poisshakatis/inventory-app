'use client';

import { useUser } from '@/UserContext';
import Link from 'next/link';

export default function Home() {
  const { user } = useUser();
  
  return (
    <main className='pb-3' role='main'>
      <div className='text-center'>
        <h1 className='display-4'>Welcome</h1>
        {!user && <Link href={'/register'}>New here?</Link>}
      </div>
    </main>
  );
}
