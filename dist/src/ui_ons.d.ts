import { UI, AuthOptions } from './interface';
import AuthComponent from './auth_component';
declare class UIOns implements UI {
    _options: AuthOptions;
    _auth: AuthComponent;
    constructor(auth: AuthComponent, options: AuthOptions);
    html(): string;
    openModal(): void;
    closeModal(): void;
    showError(message: string): void;
    showSuccess(message: string): void;
}
export default UIOns;
