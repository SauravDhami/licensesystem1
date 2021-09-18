const mongoose =  require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const applicantSchema = mongoose.Schema({
  

   
   appliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true, 
   },

   applicantName : {
     type: String,
     required: true,
    
   },

   citizenshipNumber: {
      type: String,
      required: true,
      unique: true
    },

   applicantAddress: {
      type: String,
      required: true
    },

   applicantDOB: {
      type: Date,
      required: true
    },

   applicantGender: {
      type: String,
      required: true
    },

   applicantPhoto: {
      type: String,
      required: true
    },

   transportationOffice: {
      type: String,
      required: true
    },

   licenseType: {
      type: String,
      required: true
    }
   } , {timestamps: true}
   );

const Applicant = mongoose.model('Applicant', applicantSchema);
module.exports = Applicant;