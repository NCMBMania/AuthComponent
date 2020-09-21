export interface UI {
    html(): string;
    openModal(): void;
}
export declare enum AuthType {
    ID = 0,
    Email = 1
}
export interface AuthOptions {
    auth_type?: AuthType;
    password_min?: number;
    title?: string;
}
export interface UserForm extends Object {
    userName?: string;
    mailAddress?: string;
    password: string;
}
