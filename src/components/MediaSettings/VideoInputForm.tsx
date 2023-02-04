import { useEffect, useState } from 'react';
import { SelectChangeEvent, Stack } from '@mui/material';
import VideoView from '../VideoView';
import DeviceSelect from './DeviceSelect';
import { observer } from 'mobx-react-lite';
import { useMedia } from '../../contexts/MediaContext';

const videoConstraints = {
  width: { min: 1024, ideal: 1280, max: 1920 },
  height: { min: 576, ideal: 720, max: 1080 },
};

function VideoInputForm() {
  const { videoInput } = useMedia();
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleChange = (e: SelectChangeEvent) => videoInput.setDeviceId(e.target.value);

  const startVideoStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          ...videoConstraints,
          deviceId: videoInput.deviceId,
        },
      })
      .then(setStream)
      .catch(console.error);
  };

  const stopVideoStream = () => {
    stream?.getTracks().forEach((t) => t.stop());
  };

  useEffect(() => {
    if (videoInput.deviceId) startVideoStream();
  }, [videoInput.deviceId]);

  useEffect(() => {
    return () => stopVideoStream();
  }, [stream]);

  return (
    <Stack spacing={2}>
      <VideoView stream={stream} />
      <DeviceSelect devices={videoInput.devices} deviceId={videoInput.deviceId} onChange={handleChange} />
    </Stack>
  );
}

export default observer(VideoInputForm);
