import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

import MediaSettings from '../components/MediaSettings';
import { appPaths } from '../router/paths';

export default function Home() {
  return (
    <Container>
      <p>
        <Link component={RouterLink} underline='none' to={appPaths.ROOM.replace(':roomId', '111')}>
          Room
        </Link>
      </p>
      <MediaSettings />
    </Container>
  );
}
