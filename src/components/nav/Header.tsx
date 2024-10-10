'use client';

import { useUser } from '@/UserContext';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function Header() {
  let isAdmin = false;
  const router = useRouter();

  const { user, setUser } = useUser();
  if (user) {
    const decoded: any = jwtDecode(user?.jwt);
    const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    isAdmin = !!role;
  }

  const logout = () => {
    setUser(null);
    router.push('/');
  };

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href={'/'}>Inventorio</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href={'/'}>Home</Nav.Link>
              {user && <Nav.Link as={Link} href='/storages'>Storages</Nav.Link>}
              {user && <Nav.Link as={Link} href='/items'>Items</Nav.Link>}
              {isAdmin && <Nav.Link as={Link} href='/statistics'>Statistics</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Nav className='me-auto'>
          {user
            ? <>
              <Nav.Link href='/'>Hello {user.firstName} {user.lastName}!</Nav.Link>
              <a href='/' className="nav-link">Logout</a></>
            : <>
              <Nav.Link href='/login'>Login</Nav.Link>
              <Nav.Link href='/register'>Register</Nav.Link></>}
        </Nav>
      </Navbar>
    </header>
  );
}