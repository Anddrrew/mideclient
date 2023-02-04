import SystemDevicesManager from './SystemDevicesManager';
import { makeObservable, autorun, observable } from 'mobx';

class MediaManager<T> {
  devices = [] as T;
  deviceId = 'default';

  setDeviceId(deviceId: string) {
    this.deviceId = deviceId;
  }

  constructor() {
    makeObservable(this, {
      devices: observable,
      deviceId: observable,
    });
  }
}

class VideoInputManager extends MediaManager<InputDeviceInfo[]> {
  constructor() {
    super();
    autorun(() => {
      this.devices = SystemDevicesManager.videoInput;
    });
  }
}

class AudioInputManager extends MediaManager<InputDeviceInfo[]> {
  constructor() {
    super();
    autorun(() => {
      this.devices = SystemDevicesManager.audioInput;
    });
  }
}

class AudioOutputManager extends MediaManager<MediaDeviceInfo[]> {
  constructor() {
    super();
    autorun(() => {
      this.devices = SystemDevicesManager.audioOutput;
    });
  }
}

export default {
  videoInput: new VideoInputManager(),
  audioInput: new AudioInputManager(),
  audioOutput: new AudioOutputManager(),
};
