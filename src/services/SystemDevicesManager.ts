import { makeAutoObservable } from 'mobx';
import { arraysEqual } from '../utils/equals';

class SystemDevicesManager {
  videoInput: InputDeviceInfo[] = [];
  audioInput: InputDeviceInfo[] = [];
  audioOutput: MediaDeviceInfo[] = [];

  constructor() {
    makeAutoObservable(this);

    this.getSystemDevices().then(({ videoInput, audioInput, audioOutput }) => {
      this.videoInput = videoInput;
      this.audioInput = audioInput;
      this.audioOutput = audioOutput;
    });
  }

  subscribeDeviceChange() {
    navigator.mediaDevices.ondevicechange = () => this.updateDevices();
  }

  unsubscribeDeviceChange() {
    navigator.mediaDevices.ondevicechange = null;
  }

  private async updateDevices() {
    const { videoInput, audioInput, audioOutput } = await this.getSystemDevices();

    if (!arraysEqual(this.videoInput, videoInput)) {
      this.videoInput = videoInput;
    }

    if (!arraysEqual(this.audioInput, audioInput)) {
      this.audioInput = audioInput;
    }

    if (!arraysEqual(this.audioOutput, audioOutput)) {
      this.audioOutput = audioOutput;
    }
  }

  private async getSystemDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices().catch(() => []);

    const videoInput: InputDeviceInfo[] = [];
    const audioInput: InputDeviceInfo[] = [];
    const audioOutput: MediaDeviceInfo[] = [];

    devices.forEach((device) => {
      if (device.kind === 'videoinput') videoInput.push(device);
      if (device.kind === 'audioinput') audioInput.push(device);
      if (device.kind === 'audiooutput') audioOutput.push(device);
    });

    return { videoInput, audioInput, audioOutput };
  }
}

export default new SystemDevicesManager();
