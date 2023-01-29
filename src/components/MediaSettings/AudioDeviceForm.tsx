import { FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent, Slider } from '@mui/material';
import { useEffect, useState } from 'react';

type Props = {
  devices: InputDeviceInfo[] | MediaDeviceInfo[];
  disabled?: boolean;
  defaultDevice?: string;
  defaultVolume?: number;
  onDeviceChange?: <T>(deviceId: string) => T | void;
  onVolumeChange?: <T>(volume: number) => T | void;
};

export default function AudioDeviceForm({
  devices,
  disabled,
  defaultDevice = 'default',
  defaultVolume = 30,
  onDeviceChange = () => {},
  onVolumeChange = () => {},
}: Props) {
  const [deviceId, setDeviceId] = useState(defaultDevice);
  const [volume, setVolume] = useState(defaultVolume);

  const handleChangeDevice = (e: SelectChangeEvent) => setDeviceId(e.target.value);
  const handleChangeVolume = (v: number) => setVolume(v);

  useEffect(() => {
    onDeviceChange(deviceId);
  }, [deviceId]);

  useEffect(() => {
    onVolumeChange(volume);
  }, [volume]);

  return (
    <>
      <FormControl>
        <Select
          value={devices.length ? deviceId : ''}
          onChange={handleChangeDevice}
          input={<OutlinedInput />}
          displayEmpty
          disabled={disabled}
        >
          {devices.map((device, index) => (
            <MenuItem value={device.deviceId} key={index}>
              {device.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Slider
        min={0}
        max={100}
        value={volume}
        onChange={(_, v) => handleChangeVolume(v as number)}
        valueLabelDisplay='auto'
      />
    </>
  );
}
