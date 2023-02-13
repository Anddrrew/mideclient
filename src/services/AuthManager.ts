import { makeAutoObservable } from 'mobx';

import StorageManager from './StorageManager';

class AuthManager {
  private storage = new StorageManager(localStorage, 'token');
  isLoggedIn: boolean;

  constructor() {
    makeAutoObservable(this);
    this.isLoggedIn = !!this.storage.get();
  }

  login = (token: string, cb?: () => void) => {
    this.isLoggedIn = true;
    this.storage.set(token);
    cb?.();
  };

  logout = (cb?: () => void) => {
    this.isLoggedIn = false;
    this.storage.remove();
    cb?.();
  };
}

export default new AuthManager();
