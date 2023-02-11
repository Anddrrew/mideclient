import { action, autorun, makeObservable, observable } from 'mobx';

import StorageManager from './StorageManager';
import SystemDevicesManager from './SystemDevicesManager';

class DeviceManager<T extends MediaDeviceInfo> {
  devices = [] as T[];
  deviceId: string;
  storage: StorageManager;

  constructor(storageKey: string, _autorun: (that: DeviceManager<T>) => void) {
    _autorun(this);
    this.storage = new StorageManager(localStorage, storageKey);
    this.deviceId = this.getStorageDeviceId();

    makeObservable<DeviceManager<T>, 'setId'>(this, {
      devices: observable,
      deviceId: observable,
      setId: action,
      setDevices: action,
    });

    // checks if the selected device is available when the device list is updated
    autorun(() => {
      if (!this.isDeviceAvailable(this.deviceId)) {
        this.setId(this.devices[0]?.deviceId || '');
      }
    });
  }

  private getStorageDeviceId() {
    const id = this.storage.get() || '';
    if (this.isDeviceAvailable(id)) {
      return id;
    }

    this.storage.remove();
    return '';
  }

  protected isDeviceAvailable = (deviceId: string) => {
    return !!this.devices.find((d) => d.deviceId === deviceId);
  };

  private setId(id: string) {
    this.deviceId = id;
  }

  setDevices(devices: T[]) {
    this.devices = devices;
  }

  setDeviceId = (value: string) => {
    this.setId(value);
    this.storage.set(value);
  };
}

const MediaManager = {
  videoInput: new DeviceManager<InputDeviceInfo>('videoInput', (that) =>
    autorun(() => that.setDevices(SystemDevicesManager.videoInput))
  ),
  audioInput: new DeviceManager<InputDeviceInfo>('audioInput', (that) =>
    autorun(() => that.setDevices(SystemDevicesManager.audioInput))
  ),
  audioOutput: new DeviceManager('audioOutput', (that) =>
    autorun(() => that.setDevices(SystemDevicesManager.audioOutput))
  ),
};

export default MediaManager;
