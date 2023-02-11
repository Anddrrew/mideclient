import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import React, { Suspense, useEffect, useState } from 'react';
import SystemDevicesManager from './services/SystemDevicesManager';
import Fallback from './components/Fallback';

const Router = React.lazy(() => import('./router'));

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    SystemDevicesManager.init().then(() => setAppIsReady(true));
  });

  if (!appIsReady) {
    return <Fallback />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Suspense fallback={<Fallback />}>
          <Router />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}
