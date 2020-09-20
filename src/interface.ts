export interface UI {
  html(): string;
  openModal(): void;
}

export enum AuthType {
  ID,
  Email
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
