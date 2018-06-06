module.exports = {
  init(app){
    const routes = require('../server/routes');

    if(process.env.NODE_ENV === "test") {
      const mockAuth = require("../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    }

    app.use(routes);
  }
}
