import { Box, CircularProgress, CircularProgressProps } from '@mui/material';

export default function Fallback({ ...props }: CircularProgressProps) {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' style={{ minHeight: '100vh' }}>
      <CircularProgress size={60} {...props} />
    </Box>
  );
}
