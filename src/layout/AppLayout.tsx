import { useEffect, useState } from 'react';
import { DevicesContextProvider } from '../contexts/DevicesContext';
import { MediaContextProvider } from '../contexts/MediaContext';
import { Box, CircularProgress } from '@mui/material';
import DevicesManager from '../services/DevicesManager';
import { Outlet } from 'react-router-dom';
import GeneralLayout from './GeneralLayout';

const Fallback = () => (
  <Box display='flex' alignItems='center' justifyContent='center' style={{ minHeight: 'calc(100vh - 64px)' }}>
    <CircularProgress size={60} />
  </Box>
);

export default function AppLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    DevicesManager.updateDevices().then(() => {
      setAppIsReady(true);
    });
  }, []);

  return (
    <GeneralLayout>
      {!appIsReady ? (
        <Fallback />
      ) : (
        <DevicesContextProvider>
          <MediaContextProvider>
            <Outlet />
          </MediaContextProvider>
        </DevicesContextProvider>
      )}
    </GeneralLayout>
  );
}
