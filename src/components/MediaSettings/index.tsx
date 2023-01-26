import { Grid } from '@mui/material';
import InputDeviceForm from './InputAudioForm';
import OutputAudioForm from './OutputAudioForm';

export default function MediaSettings() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        Video Settings
      </Grid>
      <Grid item xs={12}>
        Audio Settings
      </Grid>
      <Grid item xs={6}>
        <InputDeviceForm />
      </Grid>
      <Grid item xs={6}>
        <OutputAudioForm />
      </Grid>
    </Grid>
  );
}
