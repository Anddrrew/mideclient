import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import DevicesManager from '../services/DevicesManager';

const DevicesContext = createContext(DevicesManager.getDevices());
const useDevices = () => useContext(DevicesContext);

function useDevicesManager() {
  const [devices, setDevices] = useState(useDevices());

  useEffect(() => {
    const unsubscribeFromDeviceChange = DevicesManager.onDeviceChange(setDevices);
    DevicesManager.updateDevices();
    return unsubscribeFromDeviceChange;
  }, []);

  return devices;
}

type Props = {
  children: ReactNode;
};

function DevicesContextProvider({ children }: Props) {
  const devices = useDevicesManager();
  return <DevicesContext.Provider value={devices}>{children}</DevicesContext.Provider>;
}

export { DevicesContextProvider, useDevices };
