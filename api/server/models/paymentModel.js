import mongoose from "mongoose";
import Transaction from "./transactionModel.js";

const PaymentsSchema = new mongoose.Schema({
    module_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'module_name',
    },
    module_name:{
     type:String,
     enum: ['Appointments', 'Boarding', 'Vaccines', 'Treatment'],
     default: 'Boarding',
    },
    amount:{
     type:Number,
     float:true,
     required:true,
     default: 0,
    },
    status: {
     type: String,
     enum: ['Completed', 'Pending'],
     default: 'Pending',
   },
   payment_bal:{
     type:Number,
     float:true,
     default: 0,
   },
    description:{
     type:String,
    },
    
},{timestamps:true})

PaymentsSchema.pre('deleteOne', async function() {
  const module_id = this._conditions._id;
  await Transaction.deleteMany({ module_id });
});

const Payment = mongoose.model('Payments', PaymentsSchema)

 export default Payment