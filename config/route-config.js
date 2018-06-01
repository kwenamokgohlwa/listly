module.exports = {
  init(app){
    const routes = require('../server/routes');

    app.use(routes);
  }
}
