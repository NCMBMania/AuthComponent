(function($) {
  $.fn.NCMBAuth = {
    initialize: function(applicationKey, clientKey, options) {
      this.authComponent = new AuthComponent(applicationKey, clientKey, options);
      return this;
    },
    getCurrentUser: function() {
      return this.authComponent.getCurrentUser();
    },
    logout: function() {
      this.authComponent.logout();
      return this;
    },
    open: function() {
      return new Promise((res, rej) => {
        this.authComponent.openModal(res, rej);
      });
    }
  }
}(jQuery));
