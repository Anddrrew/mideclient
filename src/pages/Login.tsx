import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { signIn } = useAuth();
  return (
    <>
      <p>LOGIN</p>
      <button onClick={signIn}>LOGIN</button>
    </>
  );
}
