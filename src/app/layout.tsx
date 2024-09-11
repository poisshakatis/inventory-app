import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import Footer from '@/components/nav/Footer';
import Header from '@/components/nav/Header';
import { UserProvider } from '@/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inventory App',
  description: 'trial work',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <UserProvider>
          <Header />

          <div className='container'>
            <main role='main' className='pb-3'>
              {children}
            </main>
          </div>

          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
