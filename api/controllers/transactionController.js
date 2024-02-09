import asyncHandler from 'express-async-handler';
import Transaction from '../server/models/transactionModel.js';
import Payment from '../server/models/paymentModel.js';

export const fetchTransactions = asyncHandler( async(req, res)=>{
      const {pay_id} = req.query

      console.log(pay_id)

      const transactions = await Transaction.find({payment_id:pay_id}).populate('payment_id')

      if (transactions) {
          res.status(200).json(transactions)
      }
})

export const addTransactions = asyncHandler(async(req, res) => {
     const { payment_id, mpesa_transaction_id, amount_paid, payment_type, bank_transaction_reference, bank_name,payment_date } = req.body

      let status = 'Pending'
      let payment_bal = 0

      if (!payment_id && amount_paid && !payment_type) {
          const error = new Error("Check Required Inputs");
          error.statusCode = 400;
          throw error;
      }

      if (payment_type==="Mpesa" && mpesa_transaction_id==="") {
          const error = new Error("Mpesa Transaction number required");
          error.statusCode = 400;
          throw error;
      }

      if (payment_type==="Bank") {
          if (bank_name==="" || bank_transaction_reference==="") {
               const error = new Error("Bank Details are required");
               error.statusCode = 400;
               throw error;
          }
          
      }

      const pay_info = await Payment.findOne({_id:payment_id})
      const mpesaTransactionExist = await Transaction.findOne({payment_id:payment_id, mpesa_transaction_id:mpesa_transaction_id})

      if (pay_info.status==="Completed") {
          const error = new Error("Payment Fully Paid");
          error.statusCode = 400;
          throw error;
      }

      if (pay_info.payment_bal < amount_paid) {
          const error = new Error("Payment exceeds balance");
          error.statusCode = 400;
          throw error;
      }

      if (payment_type==="Mpesa") {
          if (mpesaTransactionExist) {
               const error = new Error("Record Already Exists");
               error.statusCode = 400;
               throw error;
          }
      }
      if (!pay_info) {
          const error = new Error("Payment Info Not Found");
          error.statusCode = 400;
          throw error;
      }

      const newTransaction = new Transaction(
          {
               payment_id, 
               mpesa_transaction_id, 
               amount_paid, 
               payment_type, 
               bank_transaction_reference,
               bank_name,
               payment_date
           }
      )

      if (pay_info.payment_bal - amount_paid === 0) {
          status = 'Completed'
      }

      const saveTransaction = await newTransaction.save()


      if (saveTransaction) {
          payment_bal = pay_info.payment_bal-amount_paid
          const updatePayment = await Payment.findByIdAndUpdate(
               payment_id,
               { status, payment_bal },
               { runValidators: true, new: true }
               )


          if (updatePayment) {
              res.status(201).json({ message: "Transaction Added Successfully" });
               
          }else{
               const error = new Error("Transaction pay failed");
               error.statusCode = 501;
               throw error;
          }
      }else{
          const error = new Error("Transaction failed");
          error.statusCode = 501;
          throw error;
     }
     
})

export const deleteTransaction = asyncHandler(async(req, res) => {
     const {id, pay_id} = req.query
     
     const pay_info = await Payment.findOne({_id:pay_id})
     const transact_info = await Transaction.findOne({_id:id})

     if (pay_info && transact_info) {
          const payment_bal=transact_info.amount_paid + pay_info.payment_bal
          const status = "Pending"
          const updateBal = await Payment.findByIdAndUpdate(
               pay_id,
               { status, payment_bal },
               { runValidators: true, new: true }
          )

          if (updateBal) {
               const deleteTransaction = await Transaction.findByIdAndDelete(id)
               if (deleteTransaction) {
                    res.status(200).json({message:"Transaction Deleted Successfully" })
               }
          }
     }

})