import { Button, Stack, Typography } from '@mui/material';
import { useDevices } from '../../contexts/DevicesContext';
import AudioDeviceForm from './AudioDeviceForm';
import { useEffect, useRef, useState } from 'react';

const CHECK_TIME_IN_MILISECONDS = 3000;

export default function InputDeviceForm() {
  const { audioInput } = useDevices();
  const [deviceId, setDeviceId] = useState('default');
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(new Audio());

  const handleDeviceChange = (deviceId: string) => setDeviceId(deviceId);

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
    <Stack>
      <Typography variant='subtitle1'>Audio Input</Typography>
      <AudioDeviceForm devices={audioInput} onDeviceChange={handleDeviceChange} />
      <Button onClick={checkAudio} variant='contained' disabled={isActive}>
        {isActive ? 'Say something' : 'Check'}
      </Button>
    </Stack>
  );
}
