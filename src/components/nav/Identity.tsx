'use client'
import Link from 'next/link';
import { UserContextType, useUser } from '../../UserContext';

export default function Identity() {
  const userContext = useUser();

  return userContext.user ? <LoggedIn userContext={userContext} /> : <LoggedOut />;
}

const LoggedOut = () => {
  return (
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <Link href={'/register'} className='nav-link text-dark'>Register</Link>
      </li>
      <li className='nav-item'>
        <Link href={'/login'} className='nav-link text-dark'>Login</Link>
      </li>
    </ul>
  );
}

interface UserProfileProps {
  userContext: UserContextType;
}

const LoggedIn: React.FC<UserProfileProps> = ({ userContext }) => {
  const { user, setUser } = userContext;

  const doLogout = () => {
    setUser(null);
  }

  return (
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <Link href={'/'} className='nav-link text-dark' title='Manage'>Hello {user!.firstName} {user!.lastName}!</Link>
      </li>
      <li className='nav-item'>
        <a onClick={() => doLogout()} href={'/'} className='nav-link text-dark' title='Logout'>Logout</a>
      </li>
    </ul>
  );
}