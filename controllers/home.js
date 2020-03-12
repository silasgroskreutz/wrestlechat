module.exports = function(async, show, _) {
  return {
    SetRouting: function(router) {
      router.get('/home', this.homePage);
    },
    homePage: function(req, res) {
      return res.render('home');
    }
  };
};
