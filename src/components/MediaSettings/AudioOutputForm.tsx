import { Button, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { useAudioOutput } from '../../contexts/MediaContext';
import AudioElement from '../../types/AudioElement';
import bleepAudio from './../../assets/audios/bleep.mp3';
import DeviceSelect from './DeviceSelect';

/*
 * Uncaught (in promise) DOMException: The operation could not be performed and was aborted
 * This error may appear in the console when developing in React Strict mode.
 * audio.play() can throw it
 *
 */

function AudioOutputForm() {
  const { devices, deviceId, setDeviceId } = useAudioOutput();
  const [audio, setAudio] = useState(new Audio(bleepAudio) as AudioElement);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleChange = (e: SelectChangeEvent) => setDeviceId(e.target.value);

  const handleCheck = () => {
    setIsPlaying((s) => !s);
    audio.play();
    setTimeout(() => setIsPlaying((s) => !s), audio.duration * 1000);
  };

  useEffect(() => {
    return () => audio.pause();
  }, [audio]);

  useEffect(() => {
    setAudio((audio) => {
      audio.setSinkId?.(deviceId);
      return audio;
    });
  }, [deviceId]);

  return (
    <Stack spacing={1}>
      <Typography variant='subtitle1'>Audio Output</Typography>
      <DeviceSelect
        devices={devices}
        deviceId={deviceId}
        onChange={handleChange}
        disabled={!audio.setSinkId || isPlaying}
      />
      <Button onClick={handleCheck} variant='contained' disabled={isPlaying}>
        Check
      </Button>
    </Stack>
  );
}

export default observer(AudioOutputForm);
