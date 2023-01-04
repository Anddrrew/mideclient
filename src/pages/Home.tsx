import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { appPaths } from '../router/paths';

export default function Home() {
  const { signOut } = useAuth();
  return (
    <>
      <p>INDEX</p>
      <p>
        <Link to={appPaths.ROOM.replace(':roomId', '111')}>Room</Link>
      </p>
      <button onClick={signOut}>LOGOUT</button>
    </>
  );
}
