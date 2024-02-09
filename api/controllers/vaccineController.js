import asyncHandler from 'express-async-handler';
import vaccine from '../server/models/vaccineModel.js';
import Payment from '../server/models/paymentModel.js';
import Transaction from '../server/models/transactionModel.js';
import User from '../server/models/userModel.js';
import Patient from '../server/models/patientModel.js';
import Vaccine from '../server/models/vaccineModel.js';
import Dose from '../server/models/dosesModel.js';

export const getAllVaccines = asyncHandler(async(req, res) => {

  const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

  const skip = (page - 1) * pageSize;

  const totalDocs = await Vaccine.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);
   const vaccines = await Vaccine.find().populate("patient")
   .sort({ createdAt: -1 })
   .skip(skip)
   .limit(pageSize);
    
    
   if (vaccines) {
    
    res.status(200).json(
      {
        page,
        pageSize,
        totalDocs,
        totalPages, 
        data: vaccines,
      }
    )
    
   }
})

export const addVaccine = asyncHandler(async(req, res) => {
    const {name, notes, total_doses, amount, description, patient} = req.body

    if (!name || !patient || !amount || !patient ) {
        const error = new Error("Check Required Inputs");
        error.statusCode = 400;
        throw error;
     }

     const patientExist = await Patient.findOne({ _id:patient });
     if (!patientExist) {
          const error = new Error("Patient doesnt exist");
          error.statusCode = 404;
          throw error;
       }
   
       
     const vaccine = new Vaccine({
          patient,
          name,
          total_doses,
          status:'Pending',
          notes,
        });
         
        
      const output= await vaccine.save();
      if (output) {
        const data = {
          module_id: output._id,
          module_name:'Vaccines',
          amount:amount,
          payment_bal:amount,
          description:description,
        }
        const newPay = new Payment(data);
        const paymentOutput= await newPay.save();
          if (paymentOutput) {
            res.status(201).json({ message: "Vaccine Added Successfully" });
            
          }
      }else{
          const error = new Error("something wrong happenned, try again");
          error.statusCode = 400;
          throw error;
      }

})


  export const editVaccine = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const {pay_id,  name, notes, total_doses, amount, description, patient} = req.body
  
    if (!name || !patient || !amount || !patient ) {
      const error = new Error("Check Required Inputs");
      error.statusCode = 400;
      throw error;
   }

   const patientExist = await Patient.findOne({ _id:patient });
   if (!patientExist) {
       const error = new Error("Patient doesnt exist");
       error.statusCode = 404;
       throw error;
    }

    const payExist = await Payment.findOne({ _id:pay_id });
   if (!payExist) {
       const error = new Error("Payment doesnt exist");
       error.statusCode = 404;
       throw error;
    }

    const transactions = await Transaction.find({ payment_id: pay_id });

    const totalPayment = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount_paid;
    }, 0);

    if (totalPayment>amount) {
          const error = new Error("Amount is less the amount paid ");
          error.statusCode = 404;
          throw error;
    }
    let payment_bal = payExist.payment_bal
    let status = payExist.status

    if (totalPayment==amount) {
      status= 'Completed'
    }

    if (payExist.amount>amount) {
       payment_bal = payExist.payment_bal-(payExist.amount - amount)
    }

    if (payExist.amount<amount) {
      payment_bal = payExist.payment_bal+(amount - payExist.amount)
   }

    const upnamedAppointment = await Vaccine.findByIdAndUpname(id, {
      name,
      total_doses,
      notes,
      patient,
    }, { new: true });

    if (upnamedAppointment) {
          const upnamePay = await Payment.findByIdAndUpname(pay_id, {
          amount,
          payment_bal,
          status,
          description,
        },{ new: true } );
          if (upnamePay) {
            return res.status(201).json({ message: 'Vaccine upnamed successfully' });

          }
    }else{
        const error = new Error('something wrong happenned, try again');
        error.statusCode = 400;
        throw error;
    }

    
  });

  export const deleteVaccine = asyncHandler(async (req, res) => {
    const { id } = req.query;

    if (!id) {
        
        const error = new Error('Id param is missing');
        error.statusCode = 400;
        throw error;
    }

    const vaccineExist = await Vaccine.findById(id);

            if (!vaccineExist) {
                const error = new Error('Vaccine Not Found');
                error.statusCode = 404;
                throw error;
            }

            const deleteVaccine = await Vaccine.deleteOne({_id:id});

            if (deleteVaccine) {
              res.status(201).json({ message: 'Vaccine record deleted successfully' });
              
            }
});

export const searchFilter = asyncHandler(async(req, res)=>{
  const {name, patient,  status} = req.body
  
  const query = {};

  if (name) {
      query.name = { $regex: new RegExp(name, 'i') };;
  }

  if (patient) {
      query.patient = patient;
  }

  if (status) {
    query.status = status;
  }

  const vaccinesFiltered = await Vaccine.find(query).populate("patient");

  res.status(200).json(vaccinesFiltered)
})
