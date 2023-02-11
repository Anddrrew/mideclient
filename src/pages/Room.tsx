import Link from '@mui/material/Link';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { appPaths } from '../router/paths';

export default function Room() {
  const { roomId } = useParams();

  return (
    <>
      <p>Room {roomId}</p>
      <p>
        <Link component={RouterLink} underline='none' to={appPaths.INDEX}>
          Home
        </Link>
      </p>
    </>
  );
}
