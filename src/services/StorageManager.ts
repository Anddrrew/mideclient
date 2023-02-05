export default class StorageManager {
  private storage: Storage;
  private key: string;

  constructor(storage: Storage, key: string) {
    this.storage = storage;
    this.key = key;
  }

  set = (value: string) => this.storage.setItem(this.key, value);

  get = () => this.storage.getItem(this.key);

  remove = () => this.storage.removeItem(this.key);
}
