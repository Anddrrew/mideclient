import { createContext, ReactNode, useContext } from 'react';

import MediaManager from '../services/MediaManager';

type Props = {
  children: ReactNode;
};

const MediaContext = createContext(MediaManager);

const useMedia = () => useContext(MediaContext);
const useVideoInput = () => useMedia().videoInput;
const useAudioInput = () => useMedia().audioInput;
const useAudioOutput = () => useMedia().audioOutput;

const MediaProvider = ({ children }: Props) => {
  return <MediaContext.Provider value={MediaManager}>{children}</MediaContext.Provider>;
};

export { MediaProvider, useAudioInput, useAudioOutput, useMedia, useVideoInput };
