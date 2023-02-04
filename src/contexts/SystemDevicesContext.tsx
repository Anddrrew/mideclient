import { ReactNode, createContext, useContext } from 'react';
import SystemDevicesManager from '../services/SystemDevicesManager';

type Props = {
  children: ReactNode;
};

const SystemDevicesContext = createContext(SystemDevicesManager);

const useSystemDevices = () => useContext(SystemDevicesContext);

const SystemDevicesProvider = ({ children }: Props) => {
  return <SystemDevicesContext.Provider value={SystemDevicesManager}>{children}</SystemDevicesContext.Provider>;
};

export { SystemDevicesProvider, useSystemDevices };
