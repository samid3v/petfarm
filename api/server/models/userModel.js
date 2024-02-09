import mongoose from "mongoose";
import bcrypt from "bcrypt"
import Patient from "./patientModel.js";
import Treatment from "./treatmentModel.js";
import Boarding from "./boardingModel.js";
import Appointment from "./appointmentsModel.js";
import Vaccine from "./vaccineModel.js";

const UserSchema = new mongoose.Schema({
    
    phone:{
        type: String,
        required:true,
        unique: true,
    },
    name:{
      type: String,
      required:true,
    },
    email:{
      type: String,
      unique:true,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer', 'employee', 'admin', 'superadmin'],
      required: true,
    },
    county:String,
    sub_county:String,
    ward:String,
    street:String,
    profile:String
    
},{timestamps:true})


UserSchema.post('deleteOne',  async function() {

  const findPatient = await Patient.find({owner:this._conditions._id})

  await Promise.all(findPatient.map(patient => Patient.deleteOne({_id:patient.id})));
  console.log('patient delete activate');
});


 const User = mongoose.model('Users', UserSchema)

 export default User