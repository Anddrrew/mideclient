import { action, makeObservable, observable } from 'mobx';

import { arraysEqual } from '../utils/equals';

type SystemDevices = {
  videoInput: InputDeviceInfo[];
  audioInput: InputDeviceInfo[];
  audioOutput: MediaDeviceInfo[];
};

class SystemDevicesManager {
  videoInput: InputDeviceInfo[] = [];
  audioInput: InputDeviceInfo[] = [];
  audioOutput: MediaDeviceInfo[] = [];

  constructor() {
    makeObservable<SystemDevicesManager, 'setVideoInput' | 'setAudioInput' | 'setAudioOutput'>(this, {
      videoInput: observable,
      audioInput: observable,
      audioOutput: observable,
      setVideoInput: action,
      setAudioInput: action,
      setAudioOutput: action,
    });
  }

  private setDevices({ videoInput, audioInput, audioOutput }: SystemDevices) {
    this.setVideoInput(videoInput);
    this.setAudioInput(audioInput);
    this.setAudioOutput(audioOutput);
  }

  private setVideoInput(devices: typeof this.videoInput) {
    this.videoInput = devices;
  }

  private setAudioInput(devices: typeof this.audioInput) {
    this.audioInput = devices;
  }

  private setAudioOutput(devices: typeof this.audioOutput) {
    this.audioOutput = devices;
  }

  private async updateDevices() {
    const { videoInput, audioInput, audioOutput } = await this.getSystemDevices();

    if (!arraysEqual(this.videoInput, videoInput)) this.setVideoInput(videoInput);
    if (!arraysEqual(this.audioInput, audioInput)) this.setAudioInput(audioInput);
    if (!arraysEqual(this.audioOutput, audioOutput)) this.setAudioOutput(audioOutput);
  }

  private async getSystemDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices().catch(() => []);

    return {
      videoInput: devices.filter((d) => d.kind === 'videoinput'),
      audioInput: devices.filter((d) => d.kind === 'audioinput'),
      audioOutput: devices.filter((d) => d.kind === 'audiooutput'),
    };
  }

  subscribeDeviceChange() {
    navigator.mediaDevices.ondevicechange = () => this.updateDevices();
  }

  unsubscribeDeviceChange() {
    navigator.mediaDevices.ondevicechange = null;
  }

  async init() {
    return await this.getSystemDevices().then((devices) => this.setDevices(devices));
  }
}

export default new SystemDevicesManager();
