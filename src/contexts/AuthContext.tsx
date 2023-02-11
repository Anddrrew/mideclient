import { createContext, ReactNode, useContext } from 'react';

import AuthManager from '../services/AuthManager';

type Props = {
  children: ReactNode;
};

const AuthContext = createContext(AuthManager);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: Props) => {
  return <AuthContext.Provider value={AuthManager}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
