import { Stack, Typography } from '@mui/material';
import { useDevices } from '../../contexts/DevicesContext';
import AudioDeviceForm from './AudioDeviceForm';

export default function InputDeviceForm() {
  const { audioInput } = useDevices();

  return (
    <Stack>
      <Typography variant='subtitle1'>Audio Input</Typography>
      <AudioDeviceForm devices={audioInput} />
    </Stack>
  );
}
