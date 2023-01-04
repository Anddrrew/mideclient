class AuthManager {
  private key = 'token';

  private get = () => localStorage.getItem(this.key) || '';

  private set = (token: string) => localStorage.setItem(this.key, token);

  private remove = () => localStorage.removeItem(this.key);

  isLoggedIn() {
    const token = this.get();
    return !!token;
  }

  login(token: string) {
    this.set(token);
  }

  logout() {
    this.remove();
  }
}

export default new AuthManager();
