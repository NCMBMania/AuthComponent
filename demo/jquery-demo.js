$(function(){
  const applicationKey = '53ee32f8cc60c24703fecd6e121cabb710c71c46f288b5864a64845c558d1fff';
  const clientKey = '3bafaebfa7a4fa9470ed7edf0a7e3811228f61e5ae930929cd49dce421311bbf';
  const options = {
    auth_type: AuthType.ID
  };
  $(document).NCMBAuth.initialize(applicationKey, clientKey, options);
  const user = $(document).NCMBAuth.getCurrentUser();
  if (user) {
    $('#user').html(user.get('userName'));
  }

  $('#logout').on('click', (e) => {
    $(document).NCMBAuth.logout();
    $('#user').html('');
  });
  $('#auth').on('click', async (e) => {
    try {
      const user = await $(document).NCMBAuth.open();
      $('#user').html(user.get('userName'));
    } catch (error) {
      console.log(error);
    }
  });
});