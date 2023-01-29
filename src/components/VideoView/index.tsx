import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';

interface Props {
  stream: MediaStream | null;
}

export default function VideoView({ stream }: Props) {
  const videoRef = useRef({} as HTMLVideoElement);

  useEffect(() => {
    if (stream?.active) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <>
      <Box style={{ aspectRatio: 16 / 9, backgroundColor: '#202124', minWidth: '100%' }}>
        {stream?.active ? (
          <video
            ref={videoRef}
            playsInline
            autoPlay
            style={{
              display: 'block',
              width: '100%',
            }}
          ></video>
        ) : (
          ''
        )}
      </Box>
    </>
  );
}
