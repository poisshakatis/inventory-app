'use client'

import Link from 'next/link';
import Identity from './Identity';
import { useUser } from '@/UserContext';
import { jwtDecode } from 'jwt-decode';

export default function Header() {
  let isAdmin = false;
  
  const { user } = useUser();
  if (user) {
    const decoded: any = jwtDecode(user?.jwt);
    const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    isAdmin = !!role;
  }
    
  return (
    <header>
      <nav className='navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3'>
        <div className='container'>
          <Link href={'/'} className='navbar-brand'>WebApp</Link>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='.navbar-collapse' aria-controls='navbarSupportedContent'
            aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='navbar-collapse collapse d-sm-inline-flex justify-content-between'>
            <ul className='navbar-nav flex-grow-1'>
              <li className='nav-item'>
                <Link href={'/'} className='nav-link text-dark'>Home</Link>
              </li>
              <li className='nav-item' style={{ 'display': user ? '' : 'none' }}>
                <Link href={'/storages'} className='nav-link text-dark'>Storages</Link>
              </li>
              <li className='nav-item' style={{ 'display': user ? '' : 'none' }}>
                <Link href={'/items'} className='nav-link text-dark'>Items</Link>
              </li>
              <li className='nav-item' style={{ 'display': isAdmin ? '' : 'none' }}>
                <Link href={'/statistics'} className='nav-link text-dark'>Statistics</Link>
              </li>
            </ul>
            <Identity />
          </div>
        </div>
      </nav>
    </header>
  );
}