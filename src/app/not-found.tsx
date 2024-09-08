import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <h1>Error 404 😥</h1>
      <p>Oops! This page was not found.</p>
      <Link href={'/'}>Return Home</Link>
    </main>
  );
}
