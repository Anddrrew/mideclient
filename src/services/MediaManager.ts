import SystemDevicesManager from './SystemDevicesManager';
import { makeObservable, autorun, observable } from 'mobx';

class MediaManager<T> {
  devices = [] as T;

  constructor() {
    makeObservable(this, {
      devices: observable,
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
