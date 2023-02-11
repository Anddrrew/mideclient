import { Button, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';

import { useAudioInput } from '../../contexts/MediaContext';
import DeviceSelect from './DeviceSelect';

const CHECK_TIME_IN_MILISECONDS = 3000;

function AudioInputForm() {
  const { devices, deviceId, setDeviceId } = useAudioInput();
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(new Audio());

  const handleChange = (e: SelectChangeEvent) => setDeviceId(e.target.value);

  const startAudio = (stream: MediaStream) => {
    audioRef.current.srcObject = stream;
    audioRef.current.play();
    setIsActive(true);
  };

  const stopAudio = () => {
    const audioStream = audioRef.current.srcObject as MediaStream | null;
    audioStream?.getTracks().forEach((t) => t.stop());
    audioRef.current.pause();
    setIsActive(false);
  };

  const checkAudio = () =>
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          deviceId,
        },
      })
      .then(startAudio)
      .then(() => setTimeout(stopAudio, CHECK_TIME_IN_MILISECONDS));

  useEffect(() => stopAudio, []);

  return (
    <Stack spacing={1}>
      <Typography variant='subtitle1'>Audio Input</Typography>
      <DeviceSelect devices={devices} deviceId={deviceId} onChange={handleChange} disabled={isActive} />
      <Button onClick={checkAudio} variant='contained' disabled={isActive}>
        {isActive ? 'Say something' : 'Check'}
      </Button>
    </Stack>
  );
}

export default observer(AudioInputForm);
