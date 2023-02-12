import { Stack } from '@mui/material';
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

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          ...videoConstraints,
          deviceId: {
            exact: deviceId,
          },
        },
      });
      setStream(stream);
    } catch (err) {
      console.error(err);
    }
  };

  const stopStream = () => {
    stream?.getTracks().forEach((t) => t.stop());
  };

  useEffect(() => {
    if (deviceId) startStream();
  }, [deviceId]);

  useEffect(() => stopStream, [stream]);

  return (
    <Stack spacing={2}>
      <VideoView stream={stream} />
      <DeviceSelect devices={devices} deviceId={deviceId} onChange={setDeviceId} />
    </Stack>
  );
}

export default observer(VideoInputForm);
