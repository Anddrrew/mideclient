import { useEffect, useRef, useState } from 'react';

/* HTMLAudioElement extends HTMLMediaElement. setSinkId doesn't work for mobile devices.
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId
 */
interface AudioElement extends HTMLAudioElement {
  setSinkId: ((id: string) => void) | undefined;
}

export default function useAudio(src: string, options = { volume: 1, playbackRate: 1 }) {
  const audio = useRef(new Audio(src) as AudioElement);
  const [isPlaying, setIsPlaying] = useState(false);

  const setSinkId = (id: string) => audio.current.setSinkId?.(id);
  audio.current.onplay = () => setIsPlaying(true);
  audio.current.onended = () => setIsPlaying(false);

  const { volume, playbackRate } = options;

  useEffect(() => {
    audio.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    audio.current.playbackRate = playbackRate;
  }, [playbackRate]);

  return {
    audio: audio.current,
    isPlaying,
    setSinkId,
  };
}
