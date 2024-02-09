import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  payment_id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Payments',
          required:true,
      },
    mpesa_transaction_id:{
     type:String,
    },
    amount_paid:{
     type:Number,
     float:true,
     required:true,
    },
    payment_type: {
     type: String,
     enum: ['Cash', 'Mpesa', 'Bank'],
     default: 'Cash',
   },
   bank_transaction_reference:{
     type:String,
    },
    bank_name:{
     type:String,
    },
    payment_date: {
     type: Date, 
     default: Date.now, 
     required: true 
   },
    
},{timestamps:true})

 const Transaction = mongoose.model('Transactions', TransactionSchema)

 export default Transaction