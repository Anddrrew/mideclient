import { Grid } from '@mui/material';
import InputDeviceForm from './InputAudioForm';
import OutputAudioForm from './OutputAudioForm';
import VideoInputForm from './VideoInputForm';
import { Stack } from '@mui/system';

export default function MediaSettings() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <VideoInputForm />
        </Grid>
        <Grid item sm={12} md={3}>
          <Stack spacing={2}>
            <InputDeviceForm />
            <OutputAudioForm />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
