import './App.css';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { Suspense, useEffect, useState } from 'react';

import Fallback from './components/Fallback';
import { AuthProvider } from './contexts/AuthContext';
import SystemDevicesManager from './services/SystemDevicesManager';

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
