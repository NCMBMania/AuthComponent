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
    constructor(applicationKey: string, clientKey: string, options: AuthOptions);
    openModal(): Promise<void>;
    closeModal(): void;
    showErrorMessage(message: string): void;
    showSuccessMessage(message: string): void;
    isValid(params: UserForm): void;
    register(params: UserForm): Promise<void>;
    passwordReminder(mailAddress: string): Promise<void>;
    registerEmail(mailAddress: string): Promise<void>;
    successCallback(user: NCMBUser): void;
    singIn(params: UserForm): Promise<void>;
    logout(): void;
    getCurrentUser(): NCMBUser | null;
}
export { NCMB, AuthOptions, AuthType, NCMBQuery, NCMBAcl, NCMBObject, NCMBUser };
