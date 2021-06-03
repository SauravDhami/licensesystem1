const express = require('express');
const multer = require('multer');

const router = express.Router();

const applicantController = require('../controllers/applicantController');
const authController = require('../controllers/authController');
// const insuranceController = require('../controllers/insuranceController');
// const paymentController = require('../controllers/paymentController');

const licenseRegistrationsRoutes = require('./licenseRegistrations');

// * image upload
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];

        let uploadError = new Error('Invalid image type!!!');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});

const uploadOptions = multer({ storage: storage });

router.use(authController.protect);

//nested routing to licenseregistration
router.use(`/:applicantId/licenseRegistrations`, licenseRegistrationsRoutes);


router.route('/').post(uploadOptions.single('applicantPhoto') ,applicantController.addApplicant);

router.route('/').get(applicantController.getAllUserApplicant);

router
    .route('/:id')
    .get(applicantController.getApplicant)
   

// router.use(`/:applicantId/insurances`, insuranceRoutes);

//! ADMIN PRIVILEDGES
router.use(authController.restrictTo('admin'));

router
    .route('/')
    .get(applicantController.getAllApplicant)
    .post(applicantController.createApplicant);
router
    .route('/:id')
    .patch(applicantController.updateApplicants)
    .delete(applicantController.deleteApplicant);


module.exports = router;