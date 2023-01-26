import { ReactNode } from 'react';
import { DevicesContextProvider } from '../contexts/DevicesContext';

interface Props {
  children: ReactNode;
}
export default function AppLayout({ children }: Props) {
  return <DevicesContextProvider>{children}</DevicesContextProvider>;
}
