import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { appPaths } from '../router/paths';

export default function Room() {
  const { roomId } = useParams();
  const { signOut } = useAuth();

  return (
    <>
      <p>ROOM {roomId}</p>
      <p>
        <Link to={appPaths.INDEX}>Home</Link>
      </p>
      <button onClick={signOut}>LOGOUT</button>
    </>
  );
}
