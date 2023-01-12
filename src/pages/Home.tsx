import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { appPaths } from '../router/paths';

export default function Home() {
  return (
    <>
      <p>Home</p>
      <p>
        <Link component={RouterLink} underline='none' to={appPaths.ROOM.replace(':roomId', '111')}>
          Room
        </Link>
      </p>
    </>
  );
}
