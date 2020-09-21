import { NCMB, NCMBQuery, NCMBAcl, NCMBObject, NCMBUser } from 'ncmb_ts';
import { AuthType, AuthOptions, UserForm } from './interface';
import UIHTML from './ui_html';
import UIOns from './ui_ons';

export default class AuthComponent {
  ncmb: NCMB;
  ui: UIHTML | UIOns;
  _options: AuthOptions;
  success: Function;
  error: Function;

  constructor(applicationKey: string, clientKey: string, options: AuthOptions) {
    this.ncmb = new NCMB(applicationKey, clientKey);
    this._options = {
      ...{
        password_min: 8,
        auth_type: AuthType.ID,
        title: '会員登録&ログイン',
      }, ...options
    };
    if (Object.keys(window).indexOf('ons') > -1) {
      this.ui = new UIOns(this, this._options);
    } else {
      this.ui = new UIHTML(this, this._options);
    }
  }

  openModal(): Promise<void> {
    return new Promise((res, rej) => {
      this.ui.openModal();
      this.success = res;
      this.error = rej;
    });
  }

  closeModal(): void {
    this.ui.closeModal();
  }
  showErrorMessage(message: string) {
    this.ui.showError(message);
  }
  showSuccessMessage(message: string) {
    this.ui.showSuccess(message);
  }

  isValid(params: UserForm) {
    if (params.password.length < this._options.password_min) {
      throw new Error(`パスワードは${this._options.password_min}文字以上にしてください`);
    }
  }

  async register(params: UserForm) {
    try {
      this.isValid(params);
      const user = await NCMBUser.signUpWith(params);
      this.successCallback(user);
    } catch (err) {
      this.showErrorMessage(err.message);
    }
  }

  async passwordReminder(mailAddress: string) {
    try {
      await NCMBUser.requestPasswordReset(mailAddress);
      this.showSuccessMessage('メールを送信しました');
    } catch (err) {
      this.showErrorMessage(err.message);
    }
  }

  async registerEmail(mailAddress: string) {
    try {
      await NCMBUser.requestSignUpEmail(mailAddress);
      this.showSuccessMessage('メールを送信しました');
    } catch (err) {
      this.showErrorMessage(err.message);
    }
  }

  successCallback(user: NCMBUser): void {
    const params = user.getJson();
    window.localStorage.setItem(NCMBUser.key(), JSON.stringify(params));
    this.closeModal();
    this.success(user);
  }

  async singIn(params: UserForm) {
    try {
      const user = await NCMBUser.loginWith(params);
      this.successCallback(user);
    } catch (err) {
      this.showErrorMessage(err.message);
    }
  }

  logout() {
    NCMBUser.logout();
    window.localStorage.removeItem(NCMBUser.key());
  }

  getCurrentUser(): NCMBUser | null {
    try {
      const json = JSON.parse(window.localStorage.getItem(NCMBUser.key()) || '');
      if (!json) return null;
      const user = new NCMBUser();
      NCMBUser.ncmb.sessionToken = json.sessionToken;
      delete json.sessionToken;
      user.sets(json);
      return user;
    } catch (err) {
      return null;
    }
  }
}

export { NCMB, AuthOptions, AuthType, NCMBQuery, NCMBAcl, NCMBObject, NCMBUser };
