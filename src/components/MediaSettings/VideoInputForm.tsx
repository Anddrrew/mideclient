import { useEffect, useState } from 'react';
import { useDevices } from '../../contexts/DevicesContext';
import { SelectChangeEvent, Stack } from '@mui/material';
import VideoView from '../VideoView';
import DeviceSelect from './DeviceSelect';

const videoConstraints = {
  width: { min: 1024, ideal: 1280, max: 1920 },
  height: { min: 576, ideal: 720, max: 1080 },
};

export default function VideoInputForm() {
  const { videoInput } = useDevices();
  const [deviceId, setDeviceId] = useState('default');
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
    setDeviceId((id) => {
      if (id && videoInput.map((d) => d.deviceId).includes(id)) {
        return id;
      }

      if (videoInput.length) {
        return videoInput[0].deviceId;
      }

      return '';
    });
  }, [videoInput]);

  useEffect(() => {
    if (deviceId) startVideoStream();
  }, [deviceId]);

  useEffect(() => {
    return () => stopVideoStream();
  }, [stream]);

  return (
    <Stack spacing={2}>
      <VideoView stream={stream} />
      <DeviceSelect devices={videoInput} deviceId={deviceId} onChange={handleChange} />
    </Stack>
  );
}
