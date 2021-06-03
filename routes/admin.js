const express = require('express');

const router = express.Router({ mergeParams: true });

const applicantsRoutes = require('./applicants');
const licenseRegistrationsRoutes = require('./licenseRegistrations');
const usersRoutes = require('./users');


const authController = require('../controllers/authController');

router.use(`/users`, usersRoutes);
router.use(`/applicants`, applicantsRoutes);
router.use(`/licenseRegistrations`, licenseRegistrationsRoutes);


router.use(authController.protect, authController.restrictTo('admin'));

router.route('/addAdmin').post(authController.addAdmin);

module.exports = router;