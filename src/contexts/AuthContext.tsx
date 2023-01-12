import { ReactNode, createContext, useContext, useState } from 'react';
import AuthManager from '../services/AuthManager';
import { appPaths, guestPaths } from '../router/paths';

const useAuthManager = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthManager.isLoggedIn());

  const signIn = () => {
    AuthManager.login('TOKEN');
    setIsLoggedIn(true);
    window.location.hash = appPaths.INDEX;
  };

  const signOut = () => {
    AuthManager.logout();
    setIsLoggedIn(false);
    window.location.hash = guestPaths.LOGIN;
  };

  return { isLoggedIn, signIn, signOut };
};

type useAuthManager = ReturnType<typeof useAuthManager>;

const AuthContext = createContext<useAuthManager>({} as useAuthManager);

function AuthContextProvider({ children }: { children: ReactNode }) {
  const auth = useAuthManager();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthContextProvider, useAuth };