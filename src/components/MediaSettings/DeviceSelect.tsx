import { MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';

type Modify<T, R> = Omit<T, keyof R> & R;

type Props = Modify<
  SelectProps,
  {
    devices: InputDeviceInfo[] | MediaDeviceInfo[];
    deviceId: string;
    onChange: (e: SelectChangeEvent<string>) => void;
  }
>;

export default function DeviceSelect({ devices, deviceId, onChange, disabled }: Props) {
  return (
    <Select value={deviceId} onChange={onChange} displayEmpty disabled={disabled}>
      {devices.map((device, index) => (
        <MenuItem value={device.deviceId} key={index}>
          {device.label}
        </MenuItem>
      ))}
    </Select>
  );
}
