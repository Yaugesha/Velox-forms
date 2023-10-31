import { observable, action, makeObservable } from "mobx";

class AuthStore {
  isAuthenticated = false;
  role = null;

  constructor() {
    makeObservable(this, {
      isAuthenticated: observable,
      role: observable,

      login: action,
      logout: action,
      setRole: action,
    });
  }

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    this.role = null;
  }

  setRole(role) {
    this.role = role;
  }
}

const authStore = new AuthStore();
export default authStore;
