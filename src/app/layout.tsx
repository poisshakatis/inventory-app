import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import Footer from '@/components/nav/Footer';
import Header from '@/components/nav/Header';
import { UserProvider } from '@/UserContext';
import { Container } from 'react-bootstrap';
import { NextUIProvider } from '@nextui-org/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inventorio',
  description: 'demo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <NextUIProvider>
          <UserProvider>
            <Header />

            <Container>
              <main role='main' className='pb-3'>
                {children}
              </main>
            </Container>

          </UserProvider>
          <Footer />
        </NextUIProvider>
      </body>
    </html>
  );
}
