const express = require('express');

const router = express.Router({ mergeParams: true });

const licenseController = require('../controllers/licenseController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router
    .route(`/`)
    .get(licenseController.getAllUserLicenseRegistration)
    .post(licenseController.addLicenseRegistration);

router.route(`/:id`).get(licenseController.getLicenseRegistration);

//! ADMIN PRIVILEDGES
router.use(authController.restrictTo('admin'));

router
    .route(`/`)
    .get(licenseController.getAllLicenseRegistration)
    .post(licenseController.createLicenseRegistration);

router
    .route('/:id')
    .patch(licenseController.updateLicenseRegistration)
    .delete(licenseController.deleteLicenseRegistration);

module.exports = router;