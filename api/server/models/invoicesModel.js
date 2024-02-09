import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
    patient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required:true,
    },
    apointment_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointments',
        required:true,
    },
    date:{
        type: Date,
        required:true,
    },
    total:{
        type: String
    },
    status: {
        type: String,
        enum: ['Paid', 'Pending'],
        default: 'Pending',
      },
    
},{timestamps:true})

 const Invoice = mongoose.model('Invoices', InvoiceSchema)

 export default Invoice