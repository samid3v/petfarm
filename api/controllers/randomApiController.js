import Patient from "../server/models/patientModel.js";
import Payment from "../server/models/paymentModel.js";
import User from "../server/models/userModel.js";
import asyncHandler from 'express-async-handler';


export const getAllPatients = asyncHandler(async(req, res) => {
     const patients = await Patient.find()

     if (!patients) {
          const error = new Error("Error Retrieving Patients");
          error.statusCode = 400;
          throw error;
     }
 
     res.status(200).json(patients)
 })

 export const getAllUsers = asyncHandler(async(req, res) => {
     const users = await User.find({ role: { $ne: 'customer' } });

     if (!users) {
          const error = new Error("Error Retrieving Patients");
          error.statusCode = 400;
          throw error;
     }
 
     res.status(200).json(users)
 })

 export const getAllCustomers = asyncHandler(async(req, res) => {
  const users = await User.find({ role:  'customer' });

  if (!users) {
       const error = new Error("Error Retrieving Patients");
       error.statusCode = 400;
       throw error;
  }

  res.status(200).json(users)
})

 export const getModelById = asyncHandler(async (req, res) => {
     const { id } = req.query;
     const { model } = req.query;

     if (!id || !model) {
          const error = new Error("Check missing param");
          error.statusCode = 400;
          throw error;
     }
    
    const payment = await Payment.findOne({ module_id: id })
   .populate({
     path: 'module_id',
     model: model, 
     populate: {
         path: 'patient',
         populate: {
           path: 'owner',
         }
       }
   })
   .populate({
     path: 'module_id',
     model: model, 
     populate: {
         path: 'vet',
         strictPopulate: false
       }
   })
   
     if (payment) {
       console.log(payment);
       res.status(200).json(payment);
     } else {
       console.error(err);
       const error = new Error(`${model} not found`);
       error.statusCode = 404; // Correct the status code to 404 for "Not Found"
       throw error;
 
     }
   
   });