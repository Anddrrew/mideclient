import { Button, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useAudioOutput } from '../../contexts/MediaContext';
import useAudio from '../../hooks/useAudio';
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
  const { audio, isPlaying, setSinkId } = useAudio(bleepAudio);

  const handleChange = (e: SelectChangeEvent) => setDeviceId(e.target.value);
  const handleCheck = () => audio.play();

  useEffect(() => {
    setSinkId(deviceId);
  }, [deviceId]);

  useEffect(() => {
    return () => audio.pause();
  }, [audio]);

  return (
    <Stack spacing={1}>
      <Typography variant='subtitle1'>Audio Output</Typography>
      <DeviceSelect
        devices={devices}
        deviceId={deviceId}
        onChange={handleChange}
        disabled={isPlaying || !audio.setSinkId}
      />
      <Button onClick={handleCheck} variant='contained' disabled={isPlaying}>
        Check
      </Button>
    </Stack>
  );
}

export default observer(AudioOutputForm);
