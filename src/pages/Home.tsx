import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useAuth } from '../contexts/AuthContext';
import { appPaths } from '../router/paths';
import { Button } from '@mui/material';

export default function Home() {
  const { signOut } = useAuth();
  return (
    <>
      <p>INDEX</p>
      <p>
        <Link component={RouterLink} underline='none' to={appPaths.ROOM.replace(':roomId', '111')}>
          Room
        </Link>
      </p>
      <Button variant='contained' onClick={signOut}>
        LOGOUT
      </Button>
    </>
  );
}
