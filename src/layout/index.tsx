import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AppLayout from './AppLayout';
import AuthLayout from './AuthLayout';

export default function Layout() {
  const { isLoggedIn, logIn, logOut } = useAuth();

  const handleClick = () => (isLoggedIn ? logOut() : logIn());

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <Link component={RouterLink} underline='none' to='/' sx={{ flexGrow: 1 }}>
            <Typography color='white' variant='h6'>
              Mide
            </Typography>
          </Link>
          <Button variant='outlined' color='inherit' disableElevation onClick={handleClick}>
            {isLoggedIn ? 'Log out' : 'Log in'}
          </Button>
        </Toolbar>
      </AppBar>
      <Box mx={3}>
        {isLoggedIn ? (
          <AppLayout>
            <Outlet />
          </AppLayout>
        ) : (
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        )}
      </Box>
    </>
  );
}
