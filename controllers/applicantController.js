const Applicant = require('../model/applicant');
const catchAsync = require('../helpers/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../helpers/appError');

exports.getAllUserApplicant = catchAsync(async (req, res, next) => {
    const applicantList = await Applicant.find({
        appliedBy: req.user.id,
    }).populate({
        path: 'appliedBy',
        select: 'userName',
    });
    

    res.status(200).json({
        status: 'success',
        results: applicantList.length,
        data: {
            applicantList,
        },
    });

});

exports.getAllApplicant = catchAsync(async (req, res, next) => {
    const applicantList = await Applicant.find().populate({
        path: 'appliedBy',
        select: 'userName',
    });
   
    res.status(200).json({
        status: 'success',
        results: applicantList.length,
        data: {
            applicantList,
        },
    });

});

exports.getApplicant = factory.getOne(Applicant, {
    path: 'appliedBy',
    select: 'userName',
});

//  = catchAsync(async (req, res, next) => {
//     const applicant = await Applicant.findById(req.params.id).populate(
//         'uploadedBy',
//         'userName'
//     );

//     if (!applicant) {
//         return next(new AppError('No applicant found with that ID', 404));
//     }

//     res.status(200).send(applicant);
// });

exports.addApplicant = catchAsync(async (req, res, next) => {

    const { file } = req;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;
    //const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    const basePath = `https://${req.get('host')}/public/uploads/`;



    let applicant = new Applicant({

            
            appliedBy: req.user.id,
            applicantName: req.body.applicantName, 
            citizenshipNumber: req.body.applicantCitizenshipNumber,
            applicantAddress: req.body.applicantAddress,
            applicantDOB: req.body.applicantDOB,
            applicantGender: req.body.applicantGender,
            applicantPhoto: `${basePath}${fileName}`, 
            transportationOffice: req.body.transportationOffice,
            licenseType: req.body.licenseType

    });

    applicant = await applicant.save();

    if (!applicant) {
        return next(new AppError('No applicant found with that ID', 404));
    }
    res.status(201).json({
        status: 'success',
        results: applicant.length,
        data: {
            applicant,
        },
    });
});

exports.updateApplicant = catchAsync(async (req, res, next) => {
    const applicant = await Applicant.findByIdAndUpdate(
        req.params.id,
        {
           
            appliedBy: req.user.id,
            applicantName: req.body.applicantName, 
            citizenshipNumber: req.body.applicantCitizenshipNumber,
            applicantAddress: req.body.applicantAddress,
            applicantDOB: req.body.applicantDOB,
            applicantGender: req.body.applicantGender,
            applicantPhoto: `${basePath}${fileName}`, 
            transportationOffice: req.body.transportationOffice,
            licenseType: req.body.licenseType
        },
        {
            new: true,
        }
    );

    if (!applicant) {
        return next(new AppError('No applicant found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        results: applicant.length,
        data: {
            applicant,
        },
    });
});

exports.createApplicant = factory.createOne(Applicant);

exports.updateApplicants = factory.updateOne(Applicant);

exports.deleteApplicant = factory.deleteOne(Applicant);
// exports.deleteApplicant = catchAsync(async (req, res, next) => {
//     const applicant = await Applicant.findByIdAndRemove(req.params.id);
//     if (!applicant) {
//         return next(new AppError('No applicant found with that ID', 404));
//     }
//     res.status(200).json({
//         success: true,
//         message: 'The applicant is deleted!',
//     });
// });