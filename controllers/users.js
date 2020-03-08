'use strict';

module.exports = function(_, passport, User, validator) {
  return {
    SetRouting: function(router) {
      router.get('/', this.indexPage);
      router.get('/signup', this.getSignUp);
      router.get('/home', this.homePage);

      //router.post('/', User.LoginValidation, this.postLogin);
      router.post(
        '/',
        [
          validator
            .check('email')
            .not()
            .isEmpty()
            .isEmail()
            .withMessage('Email is invalid'),
          validator
            .check('password')
            .not()
            .isEmpty()
            .isLength({ min: 8 })
            .withMessage(
              'Password is is required and must be at least 8 characters'
            )
        ],
        this.postValidation,
        this.postLogin
      );

      // router.post('/signup', User.SignUpValidation, this.postSignUp);
      router.post(
        '/signup',
        [
          validator
            .check('username')
            .not()
            .isEmpty()
            .isLength({ min: 5 })
            .withMessage(
              'Username is required and must be at least 5 Characters'
            ),
          validator
            .check('email')
            .not()
            .isEmpty()
            .isEmail()
            .withMessage('Email is invalid'),
          validator
            .check('password')
            .not()
            .isEmpty()
            .isLength({ min: 8 })
            .withMessage(
              'Password is is required and must be at least 8 characters'
            )
        ],
        this.postValidation,
        this.postSignUp
      );
    },

    indexPage: function(req, res) {
      const errors = req.flash('error');
      return res.render('index', {
        title: 'WrestleChat | Login',
        messages: errors,
        hasErrors: errors.length > 0
      });
    },

    postLogin: passport.authenticate('local.login', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    }),

    getSignUp: function(req, res) {
      const errors = req.flash('error');
      return res.render('signup', {
        title: 'WrestleChat | SignUp',
        messages: errors,
        hasErrors: errors.length > 0
      });
    },

    postValidation: function(req, res, next) {
      const err = validator.validationResult(req);
      const errors = err.array();
      const messages = [];
      errors.forEach(error => {
        messages.push(error.msg);
      });

      if (messages.length > 0) {
        req.flash('error', messages);
        if (req.url === '/signup') {
          res.redirect('/signup');
        } else if (req.url === '/') {
          res.redirect('/');
        }
      }
      return next();
    },

    postSignUp: passport.authenticate('local.signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    }),

    homePage: function(req, res) {
      return res.render('home');
    }
  };
};
