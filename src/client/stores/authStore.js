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
      getRole: action,
    });
  }

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  setRole(role) {
    this.role = role;
  }

  getRole() {
    return this.role;
  }
}

const authStore = new AuthStore();
export default authStore;
