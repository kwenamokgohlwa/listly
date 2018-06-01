const User = require('../models').User;
const passport = require("passport");
const bcrypt = require("bcryptjs");

module.exports = {

    signUp(req, res, next) {
      let newUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password
      };

      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);

      return User
        .create({
          name: newUser.name,
          surname: newUser.surname,
          email: newUser.email,
          password: hashedPassword
        })
        .then((user) => {
          passport.authenticate("local")(req, res, () => {
            req.flash("notice", "You've successfully signed in!");
            //  res.status(201).send(user);
            res.redirect("/");
          });
        })
        .catch((err) => {
          req.flash("error", err);
          //  res.status(400).send(err);
          res.redirect("/users/sign_up");
        });

  },

  signIn(req, res, next){
    passport.authenticate("local")(req, res, function () {
      if(!req.user){
        req.flash("notice", "Sign in failed. Please try again.")
        res.redirect("/users/sign_in");
      } else {
        req.flash("notice", "You've successfully signed in!");
        //res.status(201).send(req.user);
        res.redirect("/");
      }
    })
  },

  signOut(req, res, next){
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  }

};
