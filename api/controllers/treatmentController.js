import asyncHandler from 'express-async-handler';
import Treatment from '../server/models/treatmentModel.js';
import Payment from '../server/models/paymentModel.js';
import Transaction from '../server/models/transactionModel.js';
import User from '../server/models/userModel.js';
import Patient from '../server/models/patientModel.js';

export const getAllTreatments = asyncHandler(async(req, res) => {

  const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

  const skip = (page - 1) * pageSize;

  const totalDocs = await Treatment.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);
   const treatments = await Treatment.find().populate("patient").populate("vet")
   .sort({ createdAt: -1 })
   .skip(skip)
   .limit(pageSize);
    
    
   if (treatments) {
    
    res.status(200).json(
      {
        page,
        pageSize,
        totalDocs,
        totalPages, 
        data: treatments,
      }
    )
    
   }
})

export const addTreatment = asyncHandler(async(req, res) => {
    const {name, notes, amount, date,description, patient, vet} = req.body

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

    let newTreatmentData = {
      name,
      notes,
      patient,
      date,
    };
  
    if (vet) {
      const vetExist = await User.findOne({ _id: vet });
      if (!vetExist) {
        const error = new Error("Vet doesn't exist");
        error.statusCode = 404;
        throw error;
      }
  
      newTreatmentData.vet = vet;
    }
  
    const newTreatment = new Treatment(newTreatmentData);
      const output= await newTreatment.save();
      if (output) {
        const data = {
          module_id: output._id,
          module_name:'Treatment',
          amount:amount,
          payment_bal:amount,
          description:description,
        }
        const newPay = new Payment(data);
        const paymentOutput= await newPay.save();
          if (paymentOutput) {
            res.status(201).json({ message: "Treatment Added Successfully", paymentOutput });
            
          }
      }else{
          const error = new Error("something wrong happenned, try again");
          error.statusCode = 400;
          throw error;
      }

})

export const getTreatmentById = asyncHandler(async (req, res) => {
    const { id } = req.query;
  
    if (id) {
      const treatment = await Treatment.findById(id)
  
      if (treatment) {
        res.status(200).json(treatment);
      } else {
        const error = new Error('Treatment not found');
        error.statusCode = 404; // Correct the status code to 404 for "Not Found"
        throw error;
      }
    } else {
      const error = new Error('Invalid Request');
      error.statusCode = 400;
      throw error;
    }
  });

  export const editTreatment = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const {pay_id,  name, notes, amount, date,description, patient, vet} = req.body
  
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

    if (vet) {
      const vetExist = await User.findOne({ _id:vet });
      if (!vetExist) {
          const error = new Error("Vet doesnt exist");
          error.statusCode = 404;
          throw error;
       }
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

    const updatedAppointment = await Treatment.findByIdAndUpdate(id, {
      name,
      date,
      notes,
      patient,
      vet
    }, { new: true });

    if (updatedAppointment) {
          const updatePay = await Payment.findByIdAndUpdate(pay_id, {
          amount,
          payment_bal,
          status,
          description,
        },{ new: true } );
          if (updatePay) {
            return res.status(201).json({ message: 'Treatment updated successfully' });

          }
    }else{
        const error = new Error('something wrong happenned, try again');
        error.statusCode = 400;
        throw error;
    }

    
  });

  export const deleteTreatment = asyncHandler(async (req, res) => {
    const { id } = req.query;

    if (!id) {
        const error = new Error('Id param is required');
        error.statusCode = 400;
        throw error;
    }

    const treatmentExist = await Treatment.findById(id);

    if (!treatmentExist) {
        const error = new Error('Treatment Not Found');
        error.statusCode = 404;
        throw error;
    }

    const deleteTreatment = await Treatment.deleteOne({_id:treatmentExist._id});

    if (deleteTreatment) {
      res.status(201).json({ message: 'Treatment record deleted successfully' });
      
    }
});

export const searchFilter = asyncHandler(async(req, res)=>{
  const {start_date,end_date, patient, vet, name} = req.body
  
  const query = {};

  if (name) {
    query.name = { $regex: new RegExp(name, 'i') };
  }

  if (start_date && end_date) {
    query.date = {
      $gte: startOfDay(new Date(start_date)),
      $lte: endOfDay(new Date(end_date)),
    };
  } else if (start_date) {
    query.date = {
      $gte: startOfDay(new Date(start_date)),
    };
  } else if (end_date) {
    query.date = {
      $lte: endOfDay(new Date(end_date)),
    };
  }

  if (patient) {
      query.patient = patient;
  }

  if (vet) {
      query.vet = vet;
  }

  const appointmentsFiltered = await Treatment.find(query).populate("patient").populate("vet");

  res.status(200).json(appointmentsFiltered)
})
