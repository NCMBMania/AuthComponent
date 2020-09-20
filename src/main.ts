import AuthComponent, {NCMBUser, AuthOptions, AuthType} from './auth_component';

declare global {  
  interface Window {  
    AuthComponent: any;
    NCMBUser: any;
    AuthType: any;
    AuthOptions: any;
  }  
}  

window.AuthComponent = AuthComponent;
window.NCMBUser = NCMBUser;
window.AuthType = AuthType;

/*

const applicationKey = '53ee32f8cc60c24703fecd6e121cabb710c71c46f288b5864a64845c558d1fff';
const clientKey = '3bafaebfa7a4fa9470ed7edf0a7e3811228f61e5ae930929cd49dce421311bbf';

const options: AuthOptions = {
  auth_type: AuthType.ID
};
const authComponent = new AuthComponent(applicationKey, clientKey, options);

document.addEventListener('DOMContentLoaded', e => {
  const user = authComponent.getCurrentUser();
  if (user) {
    document.querySelector('#user').innerHTML = user.get('userName');
  }
  document.querySelector('#logout').addEventListener('click', (e) => {
    authComponent.logout();
    document.querySelector('#user').innerHTML = '';
  });
  document.querySelector('#auth').addEventListener('click', (e) => {
    authComponent.openModal(loginSuccess, loginFailure);
  });
  function loginSuccess(user: NCMBUser) {
    console.log(user);
    document.querySelector('#user').innerHTML = user.get('userName');
  }
  function loginFailure(error: Error) {
    console.log(error);
  }
});
*/
