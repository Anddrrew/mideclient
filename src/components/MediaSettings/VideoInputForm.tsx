import { SelectChangeEvent, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { useVideoInput } from '../../contexts/MediaContext';
import VideoView from '../VideoView';
import DeviceSelect from './DeviceSelect';

const videoConstraints = {
  width: { min: 1024, ideal: 1280, max: 1920 },
  height: { min: 576, ideal: 720, max: 1080 },
};

function VideoInputForm() {
  const { devices, deviceId, setDeviceId } = useVideoInput();
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleChange = (e: SelectChangeEvent) => setDeviceId(e.target.value);

  const startVideoStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          ...videoConstraints,
          deviceId,
        },
      })
      .then(setStream)
      .catch(console.error);
  };

  const stopVideoStream = () => {
    stream?.getTracks().forEach((t) => t.stop());
  };

  useEffect(() => {
    if (deviceId) startVideoStream();
  }, [deviceId]);

  useEffect(() => {
    return () => stopVideoStream();
  }, [stream]);

  return (
    <Stack spacing={2}>
      <VideoView stream={stream} />
      <DeviceSelect devices={devices} deviceId={deviceId} onChange={handleChange} />
    </Stack>
  );
}

export default observer(VideoInputForm);
