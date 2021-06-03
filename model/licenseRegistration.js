const mongoose =  require('mongoose');

const licenseRegistrationSchema = mongoose.Schema({
   

      applicant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true
      },

      userName : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      
    registrationDate: {
        type: Date,
        default: Date.now,
        required: true
      },

    examinationDate: {
        type: Date,
        required: true
      },

}, {timestamps: true});
const LicenseRegistration = mongoose.model('LicenseRegistration',licenseRegistrationSchema);

module.exports = LicenseRegistration;