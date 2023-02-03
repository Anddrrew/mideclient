import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type Props = {
  children: ReactNode;
};

export default function GeneralLayout({ children }: Props) {
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
      <Box mx={3}>{children}</Box>
    </>
  );
}
