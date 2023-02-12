import { MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';

type Modify<T, R> = Omit<T, keyof R> & R;

type Props = Modify<
  SelectProps,
  {
    devices: InputDeviceInfo[] | MediaDeviceInfo[];
    deviceId: string;
    onChange: (value: string) => void;
  }
>;

export default function DeviceSelect({ devices, deviceId, onChange, disabled }: Props) {
  const handleChange = (e: SelectChangeEvent) => onChange(e.target.value);

  return (
    <Select value={deviceId} onChange={handleChange} displayEmpty disabled={disabled || !devices.length}>
      {!deviceId ? <MenuItem value={''}>Not available</MenuItem> : ''}
      {devices.map((device, index) => (
        <MenuItem value={device.deviceId} key={index}>
          {device.label}
        </MenuItem>
      ))}
    </Select>
  );
}
