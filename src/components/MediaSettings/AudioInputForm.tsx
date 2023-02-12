import { Button, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useAudioInput, useAudioOutput } from '../../contexts/MediaContext';
import useAudio from '../../hooks/useAudio';
import DeviceSelect from './DeviceSelect';

const CHECK_TIME_IN_MILLISECONDS = 3000;

function AudioInputForm() {
  const { devices, deviceId, setDeviceId } = useAudioInput();
  const { deviceId: outputId } = useAudioOutput();
  const { audio, isPlaying, setSinkId } = useAudio();

  const startAudio = (stream: MediaStream) => {
    audio.srcObject = stream;
    audio.play();
  };

  const stopAudio = () => {
    const audioStream = audio.srcObject as MediaStream | null;
    audioStream?.getTracks().forEach((t) => t.stop());
    audio.pause();
  };

  const checkAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: {
            exact: deviceId,
          },
        },
      });

      startAudio(stream);
      setTimeout(stopAudio, CHECK_TIME_IN_MILLISECONDS);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setSinkId(outputId);
  }, [outputId]);

  useEffect(() => stopAudio, []);

  return (
    <Stack spacing={1}>
      <Typography variant='subtitle1'>Audio Input</Typography>
      <DeviceSelect devices={devices} deviceId={deviceId} onChange={setDeviceId} disabled={isPlaying} />
      <Button onClick={checkAudio} variant='contained' disabled={isPlaying}>
        {isPlaying ? 'Say something' : 'Check'}
      </Button>
    </Stack>
  );
}

export default observer(AudioInputForm);
