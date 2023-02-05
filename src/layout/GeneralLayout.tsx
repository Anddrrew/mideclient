import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { appPaths, guestPaths } from '../router/paths';
import { observer } from 'mobx-react-lite';

type Props = {
  children: ReactNode;
};

function GeneralLayout({ children }: Props) {
  const { isLoggedIn, login, logout } = useAuth();

  const handleClick = () =>
    isLoggedIn
      ? logout(() => history.replaceState('', '', guestPaths.LOGIN))
      : login('fake_token', () => history.replaceState('', '', appPaths.INDEX));

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

export default observer(GeneralLayout);
