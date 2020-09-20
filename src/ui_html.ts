import { UI, AuthType, AuthOptions, UserForm } from './interface';
import AuthComponent from './auth_component';

const tingle = require('tingle.js');
import 'tingle.js/dist/tingle.min.css';
import './form.css';

class UIHTML implements UI {
  _options: AuthOptions;
  _auth: AuthComponent;
  _className: string;
  modal: any;
  _register: boolean = false;

  constructor(auth: AuthComponent, options: AuthOptions) {
    this._auth = auth;
    this._options = options;
    this._className = 'auth-modal';
  }

  open(): void {
    console.log('modal open');
  }
  close(): void {
    const modal = <HTMLDivElement> document.querySelector('.auth-modal');
    modal.remove();
  }
  beforeClose(): boolean {
    return true;
  }

  showError(message: string) {
    const error = <HTMLDivElement> document.querySelector('.auth-modal .error-message');
    this.showMessage(error, message);
  }
  showMessage(dom: HTMLDivElement, message: string) {
    dom.innerHTML = message;
    dom.style.display = 'block';
    setTimeout(() => {
      dom.innerHTML = '';
      dom.style.display = 'none';
    }, 3000);
  }

  showSuccess(message: string) {
    const dom = <HTMLDivElement> document.querySelector('.auth-modal .success-message');
    this.showMessage(dom, message);
  }

  signIn(): void {
    this._auth.singIn(this.getParams());
  }

  getParams(): UserForm {
    const form = <HTMLFormElement> document.querySelector(`.${this._className} form`);
    const params: UserForm = {password: ''};
    for (let i = 0; i < form.elements.length; i++) {
      const ele = <HTMLFormElement> form.elements[i];
      const value = ele.value;
      switch (ele.getAttribute('name')) {
        case 'userName':
          params.userName = value;
          break;
        case 'mailAddress':
          params.mailAddress = value;
          break;
        case 'password':
          params.password = value;
      }
    }
    return params;
  }

  register(): void {
    this._auth.register(this.getParams());
  }

  passwordReminder(): void {
    const form = <HTMLFormElement> document.querySelector(`.${this._className} form`);
    const email = (<HTMLFormElement> form.elements[0]).value;
    if (this._register) {
      this._auth.registerEmail(email);
    } else {
      this._auth.passwordReminder(email);
    }
  }

  openModal(): void {
    this.modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: '閉じる',
        cssClass: [this._className],
        onOpen: this.open,
        onClose: this.close,
        beforeClose: this.beforeClose,
    });
    this.changeSignUpForm();
    this.modal.open();
  }

  changeSignUpForm(): void {
    this.modal.setContent(this.html());
    this.modal.setFooterContent('');
    this.modal.addFooterBtn('登録する', 'tingle-btn tingle-btn--primary', this.register.bind(this));
    this.modal.addFooterBtn('ログインする', 'tingle-btn tingle-btn--success', this.signIn.bind(this));
    document.querySelector('.auth-modal .forget-password').addEventListener('click', this.changeEmailForm.bind(this));
    document.querySelector('.auth-modal .email-register').addEventListener('click', this.changeEmailRegisterForm.bind(this));
    document.querySelector('.auth-modal .change-auth').addEventListener('click', this.changeAuth.bind(this));
  }

  changeAuth(): void {
    if (this._options.auth_type === AuthType.ID) {
      this._options.auth_type = AuthType.Email;
    } else {
      this._options.auth_type = AuthType.ID;
    }
    this.changeSignUpForm();
  }

  changeEmailRegisterForm(): void {
    this._register = true;
    this.changeEmailForm();
  }

  changeEmailForm(): void {
    this.modal.setContent(this.emailHtml());
    this.modal.setFooterContent('');
    this.modal.addFooterBtn('メールを送信する', 'tingle-btn tingle-btn--primary', this.passwordReminder.bind(this));
    document.querySelector('.auth-modal .back-to-login').addEventListener('click', this.changeSignUpForm.bind(this));
  }

  closeModal(): void {
    this.modal.close();
  }

  html(): string {
    const idAuth = this._options.auth_type === AuthType.ID;
    return `<h1>${this._options.title }</h1>
    <form>
      <div class="form-group">
        <label for="inputUserName">
          ${idAuth ? 'ユーザ名' : 'メールアドレス'}
          <span class="change-auth">(メールとユーザ名の切り替え)</span>
        </label>
        <input type="${idAuth ? 'text' : 'email'}" class="form-control" value="" name="${idAuth ? 'userName' : 'mailAddress'}" aria-describedby="userNameHelp">
        <small id="userNameHelp" class="form-text text-muted">${idAuth ? 'ユーザ名' : 'メールアドレス'}を入力して下さい</small>
      </div>
      <div class="form-group">
        <label for="inputUserName">パスワード</label>
        <input type="password" class="form-control" value="" name="password" aria-describedby="passwordHelp">
        <small id="passwordHelp" class="form-text text-muted">
          パスワードを入力して下さい（最低${this._options.password_min}文字です）
        </small>
      </div>
      <div class="form-group">
        <div class="forget-password">パスワードを忘れた場合はこちら</div><br />
        <div class="email-register">メールアドレスから会員登録する場合はこちら</div>
      </div>
      <div class="alert danger error-message hide"></div>
    </form>
    `;
  }
  emailHtml(): string {
    return `<h1>${this._register ? 'メールアドレスから会員登録' : 'パスワードリマインダーを送信する' }</h1>
    <form>
      <div class="form-group">
        <label for="inputUserName">メールアドレス</label>
        <input type="email" class="form-control" value="" name="mailAddress" aria-describedby="userNameHelp">
        <small id="userNameHelp" class="form-text text-muted">メールアドレスを入力して下さい</small>
      </div>
      <div class="form-group">
        <div class="back-to-login">ログイン/会員登録に戻る場合はこちら</div>
      </div>
      <div class="alert danger error-message hide"></div>
      <div class="alert success success-message hide"></div>
    </form>
    `;
  }

}

export default UIHTML;
