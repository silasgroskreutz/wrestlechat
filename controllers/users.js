'use strict';

module.exports = function(_) {
  return {
    SetRouting: function(router) {
      router.get('/', this.indexPage);
      router.get('/signup', this.getSignUp);
    },

    indexPage: function(req, res) {
      return res.render('index', { test: 'Everything is shiny captain!' });
    },

    getSignUp: function(req, res) {
      return res.render('signup');
    }
  };
};
