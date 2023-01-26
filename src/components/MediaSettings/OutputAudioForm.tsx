import { Button, Stack, Typography } from '@mui/material';
import AudioDeviceForm from './AudioDeviceForm';
import { useDevices } from '../../contexts/DevicesContext';
import bleepAudio from './../../assets/audios/bleep.mp3';
import { useEffect, useState } from 'react';

/* setSinkId doesn't work for mobile devices.
 * https://caniuse.com/mdn-api_htmlmediaelement_setsinkid
 */

interface AudioElement extends HTMLVideoElement {
  setSinkId(id: string): void;
}

export default function OutputAudioForm() {
  const { audioOutput } = useDevices();
  const [volume, setVolume] = useState(100);
  const [deviceId, setDeviceId] = useState('default');
  const [audio, setAudio] = useState(new Audio(bleepAudio) as AudioElement);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDeviceIdChange = (deviceId: string) => setDeviceId(deviceId);
  const handleVolumeChange = (volume: number) => setVolume(volume);
  const handleCheck = () => {
    setIsPlaying((s) => !s);
    audio.play();
    setTimeout(() => setIsPlaying((s) => !s), audio.duration * 1000);
  };

  useEffect(() => {
    setAudio((audio) => {
      audio.volume = volume / 100;
      return audio;
    });
  }, [volume]);

  useEffect(() => {
    setAudio((audio) => {
      audio.setSinkId(deviceId);
      return audio;
    });
  }, [deviceId]);

  return (
    <Stack>
      <Typography variant='subtitle1'>Output Device</Typography>
      <AudioDeviceForm
        devices={audioOutput}
        onDeviceChange={handleDeviceIdChange}
        onVolumeChange={handleVolumeChange}
      />
      <Button onClick={handleCheck} variant='contained' disabled={isPlaying}>
        Check
      </Button>
    </Stack>
  );
}
