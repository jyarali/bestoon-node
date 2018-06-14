module.exports = function(app) {
  var jcontrol = require('../controller/controller');
  var auth = require('../controller/auth'),
  verifyToken = require('../controller/tokenvalidate');

  // my personal routes
  app.route('/')
    .get(jcontrol.jroot);

  // jcontrol Routes
  app.route('/income')
    .get(verifyToken,jcontrol.list_incomes)
    .post(verifyToken,jcontrol.create_income);

  app.route('/expense')
    .get(verifyToken,jcontrol.list_expense)
    .post(verifyToken,jcontrol.create_expense);

  app.route('/expense/:expenseId')
    .get(jcontrol.read_expense)
    .put(verifyToken,jcontrol.update_expense)
    .delete(verifyToken,jcontrol.delete_expense);

  app.route('/income/:incomeId')
    .get(jcontrol.read_income)
    .put(verifyToken,jcontrol.update_income)
    .delete(verifyToken,jcontrol.delete_income);

  // authenticate routes
  app.route('/register')
    .post(auth.create_user);

  // user login
  app.route('/login')
    .post(auth.login_user);
  app.route('/delete/:uid')
    .delete(auth.delete_user);

  //will be deleted soon!
  app.route('/users')
    .get(auth.list_users);
};