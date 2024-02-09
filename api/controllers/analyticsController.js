import asyncHandler from 'express-async-handler';
import Vaccine from '../server/models/vaccineModel.js';
import User from '../server/models/userModel.js';
import Patient from '../server/models/patientModel.js';
import Treatment from '../server/models/treatmentModel.js';
import Appointment from '../server/models/appointmentsModel.js';
import Dose from '../server/models/dosesModel.js';

export const moduleStats = asyncHandler(async(req, res)=>{
     const doses = await Vaccine.countDocuments({
          status: 'Completed',
        });
        const customers = await User.countDocuments({
          role: 'customer',
        });
        const patients = await Patient.countDocuments();
        const treatments = await Treatment.countDocuments();
        const appointments = await Appointment.countDocuments({
          status: 'Completed',
        });

        

        res.status(200).json({
          doses,
          customers,
          patients,
          treatments,
          appointments
        })
})

export const upcomingAppointmentsFn = asyncHandler(async(req,res)=>{
  const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);

    // Find appointments with the status 'Booked' and dates within the range
    const upcomingAppointments = await Appointment.find({
      status: 'Booked',
      date: { $gte: today, $lte: sevenDaysLater },
    }).populate('patient').populate('vet').sort({ date: 1 });

    res.status(200).json(upcomingAppointments);
})

export const upcomingVaccinesFn = asyncHandler(async(req,res)=>{
  const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);

    // Find appointments with the status 'Booked' and dates within the range
    const upcomingVaccines = await Dose.find({
      administered: false,
      date: { $gte: today, $lte: sevenDaysLater },
    }).populate('vet').populate(
      {path:"vaccine", populate: {
      path: 'patient',
    },}).sort({ date: 1 });

    res.status(200).json(upcomingVaccines);
})