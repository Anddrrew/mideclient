import { Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { signIn } = useAuth();
  return (
    <>
      <p>LOGIN</p>
      <Button variant='contained' onClick={signIn}>
        LOGIN
      </Button>
    </>
  );
}
