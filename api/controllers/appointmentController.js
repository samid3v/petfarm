import asyncHandler from 'express-async-handler';
import Patient from '../server/models/patientModel.js';
import Appointment from '../server/models/appointmentsModel.js';
import User from '../server/models/userModel.js';
import Payment from '../server/models/paymentModel.js';
import Transaction from '../server/models/transactionModel.js';
import { startOfDay, endOfDay } from 'date-fns';


export const getStatusStats = asyncHandler(async(req, res) => {
  const statusCounts = await Appointment.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: '$_id',
        count: 1,
      },
    },
  ]);

  const result = statusCounts.reduce((acc, { status, count }) => {
    acc[status] = count;
    return acc;
  }, {});

  res.json(result);

})

export const getAllAppointments = asyncHandler(async(req, res) => {
    
    const status = req.query.status
  const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

  const skip = (page - 1) * pageSize;

  const totalAppointments = await Appointment.countDocuments();
  const totalPages = Math.ceil(totalAppointments / pageSize);

  const appointments = await Appointment.find({ status: status })
  .populate(
    {path:"patient", populate: {
    path: 'owner',
  },})
  .populate('vet')
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(pageSize);

  res.status(200).json({
    page,
    pageSize,
    totalAppointments,
    totalPages,
    data:appointments
  })

})

export const addAppointment = asyncHandler(async(req, res) => {
    const {patient, vet,reason,date, amount, notes,status, description} = req.body

    if (!patient || !reason || !amount || !date) {
      const error = new Error("Check required form fields");
        error.statusCode = 404;
        throw error;
    }

    const patientExist = await Patient.findOne({ _id:patient });
    if (!patientExist) {
        const error = new Error("Patient doesnt exist");
        error.statusCode = 404;
        throw error;
     }
    if (vet) {
      const user = await User.findOne({ _id:vet });
      if (!user) {
         const error = new Error("Vet doesnt exist");
             error.statusCode = 404;
             throw error;
      }
    }
   
     const existingAppointment = await Appointment.findOne({
        patient,
        date
      });

      if (existingAppointment) {
        const error = new Error("Appointment Already Exists");
            error.statusCode = 400;
            throw error;
      }

    

    if (patient || vet || reason || date ) {
        
        const newAppointment = new Appointment({patient, vet,reason,date, notes,status});
        const output= await newAppointment.save();
        if (output) {
          const data = {
            module_id: output._id,
            module_name:'Appointments',
            amount:amount,
            payment_bal:amount,
            description:description,
          }
          const newPay = new Payment(data);
          const paymentOutput= await newPay.save();
          if (paymentOutput) {
            res.status(201).json({message:"Appointment Added Successfully"})
            
          }
        }else{
            const error = new Error("something wrong happenned, try again");
            error.statusCode = 400;
            throw error;
        }
    }else{
        const error = new Error("check required fields");
        error.statusCode = 400;
        throw error;
    }

})

export const getAppointmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (id) {
      const appointment = await Appointment.findById(id)
      .populate('patient')
      .populate('vet', '-password');
  
      if (appointment) {
        res.status(200).json(appointment);
      } else {
        const error = new Error('Appointment not found');
        error.statusCode = 404; // Correct the status code to 404 for "Not Found"
        throw error;
      }
    } else {
      const error = new Error('Invalid Request');
      error.statusCode = 400;
      throw error;
    }
  });

  export const editAppointment = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const {pay_id,  reason, notes, amount, date,description, patient, vet} = req.body
  
    if (!reason || !amount || !patient ) {
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
    let payment_bal = 0
    let status = payExist.status

    if (totalPayment==amount) {
      status= 'Completed'
    }

    if (payExist.amount>amount) {
       payment_bal = payExist.payment_bal-(payExist.amount - amount)
    }else{
       payment_bal = payExist.payment_bal
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, {
      reason,
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

  export const editAppointmentStatus = asyncHandler(async (req, res) => {
    const { id, status } = req.query;

    if (!id) {
      const error = new Error("Id Not Added");
      error.statusCode = 404;
      throw error;
   }

    if (!status) {
        const error = new Error("Status Not Added");
        error.statusCode = 404;
        throw error;
     }

     const clinicExist = Appointment.findById(id)

     if (!clinicExist) {
      const error = new Error("Appointment Not Found");
        error.statusCode = 404;
        throw error;
     }
  
    
     const updatedClinicStatus = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { runValidators: true, new: true }
    );

    if (updatedClinicStatus) {
      return res.status(201).json({ message: 'Appointment Status updated successfully' });
    }else{
        const error = new Error('Appointment Info Not Added');
        error.statusCode = 400;
        throw error;
    }
    
  });

  export const deleteAppointment = asyncHandler(async (req, res) => {
    const { id } = req.query;

    if (!id) {
        const error = new Error('Id param is required');
        error.statusCode = 400;
        throw error;
    }

    const clinicExist = await Appointment.findById(id);

    if (!clinicExist) {
        const error = new Error('Appointment Not Found');
        error.statusCode = 404;
        throw error;
    }

    const deleteClinic = await Appointment.deleteOne({ _id: id });
    if (deleteClinic) {
      res.status(201).json({ message: 'Appointment record deleted successfully' });
    }
    
  });

  export const searchFilter = asyncHandler(async(req, res)=>{
    const {start_date,end_date, patient, vet, status} = req.body
    
    const query = {};
  
    if (start_date && end_date) {
      // If both start_date and end_date are provided, filter by date range
      query.date = {
        $gte: startOfDay(new Date(start_date)),
        $lte: endOfDay(new Date(end_date)),
      };
    } else if (start_date) {
      // If only start_date is provided, filter by start_date onwards
      query.date = {
        $gte: startOfDay(new Date(start_date)),
      };
    } else if (end_date) {
      // If only end_date is provided, filter by end_date and before
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

    if (status) {
      query.status = status;
    }
  
    const appointmentsFiltered = await Appointment.find(query).populate(
      {path:"patient", populate: {
      path: 'owner',
    },});
  
    res.status(200).json(appointmentsFiltered)
  })