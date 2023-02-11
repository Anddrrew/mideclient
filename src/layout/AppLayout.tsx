import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { MediaProvider } from '../contexts/MediaContext';
import SystemDevicesManager from '../services/SystemDevicesManager';
import GeneralLayout from './GeneralLayout';

export default function AppLayout() {
  useEffect(() => {
    SystemDevicesManager.subscribeDeviceChange();
    return () => SystemDevicesManager.unsubscribeDeviceChange();
  }, []);

  return (
    <GeneralLayout>
      <MediaProvider>
        <Outlet />
      </MediaProvider>
    </GeneralLayout>
  );
}
