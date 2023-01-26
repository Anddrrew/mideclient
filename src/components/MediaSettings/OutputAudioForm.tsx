import { Stack, Typography } from '@mui/material';
import AudioDeviceForm from './AudioDeviceForm';
import { useDevices } from '../../contexts/DevicesContext';

export default function OutputAudioForm() {
  const { audioOutput } = useDevices();

  return (
    <Stack>
      <Typography variant='subtitle1'>Output Device</Typography>
      <AudioDeviceForm devices={audioOutput} />
    </Stack>
  );
}
