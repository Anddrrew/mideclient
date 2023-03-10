import { Button, Stack, Typography } from '@mui/material';
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

  const startAudio = () => audio.play();
  const stopAudio = () => audio.pause();

  useEffect(() => {
    setSinkId(deviceId);
  }, [deviceId]);

  useEffect(() => stopAudio, []);

  return (
    <Stack spacing={1}>
      <Typography variant='subtitle1'>Audio Output</Typography>
      <DeviceSelect
        devices={devices}
        deviceId={deviceId}
        onChange={setDeviceId}
        disabled={isPlaying || !audio.setSinkId}
      />
      <Button onClick={startAudio} variant='contained' disabled={isPlaying}>
        Check
      </Button>
    </Stack>
  );
}

export default observer(AudioOutputForm);
