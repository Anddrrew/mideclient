import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useAuth } from '../contexts/AuthContext';
import { appPaths } from '../router/paths';
import { Button } from '@mui/material';

export default function Room() {
  const { roomId } = useParams();
  const { signOut } = useAuth();

  return (
    <>
      <p>ROOM {roomId}</p>
      <p>
        <Link component={RouterLink} underline='none' to={appPaths.INDEX}>
          Home
        </Link>
      </p>
      <Button variant='contained' onClick={signOut}>
        LOGOUT
      </Button>
    </>
  );
}
