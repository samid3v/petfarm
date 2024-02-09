import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
    appointment_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointments',
    },
    medication_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medications',
        required: true
    },
    dosage:{
        type: Number,
        required:true,
    },
    frequency:{
        type: string,
        required:true,
    },
    start_date:{
        type: Date,
    },
    end_date:{
        type: Date,
    },
    
},{timestamps:true})

 const Prescription = mongoose.model('Prescriptions', PrescriptionSchema)

 export default Prescription