const myExpress = require('express');
const theRouter = myExpress.Router();
const schoolCtrl = require('../controllers/schoolController');

// defining the routes
theRouter.post('/addSchool', schoolCtrl.addNewSchool);
theRouter.get('/listSchools', schoolCtrl.getSchools);

module.exports = theRouter;
