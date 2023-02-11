import { Grid, Stack } from '@mui/material';

import AudioInputForm from './AudioInputForm';
import AudioOutputForm from './AudioOutputForm';
import VideoInputForm from './VideoInputForm';

export default function MediaSettings() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <VideoInputForm />
        </Grid>
        <Grid item sm={12} md={3}>
          <Stack spacing={2}>
            <AudioInputForm />
            <AudioOutputForm />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
