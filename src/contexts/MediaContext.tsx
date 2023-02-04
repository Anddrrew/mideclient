import { ReactNode, createContext, useContext } from 'react';
import MediaManager from '../services/MediaManager';

type Props = {
  children: ReactNode;
};

const MediaContext = createContext(MediaManager);

const useMedia = () => useContext(MediaContext);

const MediaProvider = ({ children }: Props) => {
  return <MediaContext.Provider value={MediaManager}>{children}</MediaContext.Provider>;
};

export { MediaProvider, useMedia };
