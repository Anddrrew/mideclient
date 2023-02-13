import { useEffect, useRef, useState } from 'react';

/* HTMLAudioElement extends HTMLMediaElement. setSinkId doesn't work for mobile devices.
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId
 */
interface AudioElement extends HTMLAudioElement {
  setSinkId: ((id: string) => void) | undefined;
}

export default function useAudio(src?: string | MediaStream, options = { volume: 1, playbackRate: 1 }) {
  const audio = useRef(new Audio() as AudioElement);
  const [isPlaying, setIsPlaying] = useState(false);

  const setSinkId = (id: string) => audio.current.setSinkId?.(id);
  audio.current.onplay = () => setIsPlaying(true);
  audio.current.onpause = () => setIsPlaying(false);
  audio.current.onended = () => setIsPlaying(false);

  useEffect(() => {
    if (typeof src === 'string') audio.current.src = src;
    if (src instanceof MediaStream) audio.current.srcObject = src;
  }, [src]);

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
