import { ReactNode, createContext, useContext, useState } from 'react';
import AuthManager from '../services/AuthManager';
import { appPaths, guestPaths } from '../router/paths';

const useAuthManager = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthManager.isLoggedIn());

  const logIn = () => {
    AuthManager.login('TOKEN');
    setIsLoggedIn(true);
    history.replaceState('', '', appPaths.INDEX);
  };

  const logOut = () => {
    AuthManager.logout();
    setIsLoggedIn(false);
    history.replaceState('', '', guestPaths.LOGIN);
  };

  return { isLoggedIn, logIn, logOut };
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
