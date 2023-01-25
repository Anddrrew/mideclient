import EventEmitter from 'events';
import IDevices from '../types/IDevices';

enum eventTypes {
  DeviceChange = 'deviceChange',
}

class DevicesManager {
  private emitter = new EventEmitter();
  private videoInput: InputDeviceInfo[] = [];
  private audioInput: InputDeviceInfo[] = [];
  private audioOutput: MediaDeviceInfo[] = [];

  constructor() {
    navigator.mediaDevices.ondevicechange = () => this.updateDevices();
  }

  async updateDevices() {
    await this.loadDevices();
    this.emitter.emit(eventTypes.DeviceChange, this.getDevices());
  }

  onDeviceChange(cb: (devices: IDevices) => void) {
    this.emitter.on(eventTypes.DeviceChange, cb);

    return () => {
      this.emitter.off(eventTypes.DeviceChange, cb);
    };
  }

  getDevices() {
    return {
      videoInput: this.videoInput,
      audioInput: this.audioInput,
      audioOutput: this.audioOutput,
    };
  }

  private async loadDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices().catch(() => [] as MediaDeviceInfo[]);

    this.videoInput = [];
    this.audioInput = [];
    this.audioOutput = [];

    devices.forEach((device) => {
      switch (device.kind) {
        case 'videoinput':
          this.videoInput.push(device);
          break;
        case 'audioinput':
          this.audioInput.push(device);
          break;
        case 'audiooutput':
          this.audioOutput.push(device);
          break;
      }
    });
  }
}

export default new DevicesManager();
