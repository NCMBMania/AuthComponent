import { UI, AuthType, AuthOptions } from './interface';
import AuthComponent from './auth_component';

class UIOns implements UI {
  _options: AuthOptions;
  _auth: AuthComponent;

  constructor(auth: AuthComponent, options: AuthOptions) {
    this._auth = auth;
    this._options = options;
  }

  html(): string {
    return '';
  }
  openModal(): void {

  }
  closeModal(): void {

  }
  showError(message: string) {
  }
  showSuccess(message: string) {
  }
}

export default UIOns;
