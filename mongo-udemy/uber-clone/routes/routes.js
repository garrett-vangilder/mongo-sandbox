const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
  // Watch for incoming requests of method GET
  // to the route /api
  app.get('/api', DriversController.greeting);
  app.post('/api/drivers', DriversController.create);
};