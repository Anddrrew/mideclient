import { Button, SelectChangeEvent, Stack, Typography } from '@mui/material';
import bleepAudio from './../../assets/audios/bleep.mp3';
import { useEffect, useState } from 'react';
import AudioElement from '../../types/AudioElement';
import DeviceSelect from './DeviceSelect';
import { observer } from 'mobx-react-lite';
import { useMedia } from '../../contexts/MediaContext';

function AudioOutputForm() {
  const { audioOutput } = useMedia();
  const [audio, setAudio] = useState(new Audio(bleepAudio) as AudioElement);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleChange = (e: SelectChangeEvent) => audioOutput.setDeviceId(e.target.value);

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
      audio.setSinkId?.(audioOutput.deviceId);
      return audio;
    });
  }, [audioOutput.deviceId]);

  return (
    <Stack spacing={1}>
      <Typography variant='subtitle1'>Audio Output</Typography>
      <DeviceSelect
        devices={audioOutput.devices}
        deviceId={audioOutput.deviceId}
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