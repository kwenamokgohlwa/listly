module.exports = {
  validateUsers(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("name", "must be at least 3 characters in length").isLength({min: 3});
      req.checkBody("surname", "must be at least 3 characters in length").isLength({min: 3});
      req.checkBody("email", "must be valid").isEmail();
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  },

  validateLists(req, res, next) {

    if(req.method === "POST") {
      req.checkBody("name", "must be at least 3 characters in length").isLength({min: 3});
    }

    if(req.method === "PUT") {
      req.checkBody("name", "must be at least 3 characters in length").isLength({min: 3});
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  },

  validateItems(req, res, next) {

    if(req.method === "POST") {
      req.checkBody("name", "must be at least 3 characters in length").isLength({min: 3});
      req.checkBody("quantity", "must be at least 3 characters in length").isInt();
      req.checkBody("price", "must be at least 6 characters in length").isDecimal();
    }

    if(req.method === "PUT") {
      req.checkBody("name", "must be at least 3 characters in length").isLength({min: 3});
      req.checkBody("quantity", "must be at least 3 characters in length").isInt();
      req.checkBody("price", "must be at least 6 characters in length").isDecimal();
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  }

}
