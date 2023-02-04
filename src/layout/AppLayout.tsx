import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';
import GeneralLayout from './GeneralLayout';
import { SystemDevicesProvider } from '../contexts/SystemDevicesContext';
import SystemDevicesManager from '../services/SystemDevicesManager';

const Fallback = () => (
  <Box display='flex' alignItems='center' justifyContent='center' style={{ minHeight: 'calc(100vh - 64px)' }}>
    <CircularProgress size={60} />
  </Box>
);

export default function AppLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    SystemDevicesManager.subscribeDeviceChange();
    setAppIsReady(true);
    return () => SystemDevicesManager.unsubscribeDeviceChange();
  }, []);

  return (
    <GeneralLayout>
      {!appIsReady ? (
        <Fallback />
      ) : (
        <SystemDevicesProvider>
          <Outlet />
        </SystemDevicesProvider>
      )}
    </GeneralLayout>
  );
}
