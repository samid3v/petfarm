import mongoose from "mongoose";
import Payment from "./paymentModel.js";

const AppointmentSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required:true,
    },
    vet:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true,
    },
    reason:{
        type: String,
        required:true,
        
    },
    date:{
        type: Date,
        required:true,
    },
    notes:{
        type: String
    },
    status: {
        type: String,
        enum: ['Booked', 'Completed', 'Canceled'],
        default: 'Booked',
      },
    
},{timestamps:true})

AppointmentSchema.post('deleteOne', async function() {
    const module_id = this._conditions._id;
    await Payment.deleteOne({ module_id });

    
});


 const Appointment = mongoose.model('Appointments', AppointmentSchema)

 export default Appointment