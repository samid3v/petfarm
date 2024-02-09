import asyncHandler from 'express-async-handler';
import Patient from '../server/models/patientModel.js';
import Appointment from '../server/models/appointmentsModel.js';
import User from '../server/models/userModel.js';

export const getAllPrescription = asyncHandler(async(req, res) => {
    const appointments = await Appointment.find()
    .populate('patient_id') 
    .populate('by', '-password');

    res.status(200).json(appointments)
})

export const addAppointment = asyncHandler(async(req, res) => {
    const {patient_id, by,reason,date, notes,status} = req.body

    const patient = await Patient.findOne({ _id:patient_id });
    if (!patient) {
        const error = new Error("Patient doesnt exist");
        error.statusCode = 404;
        throw error;
     }

    const user = await User.findOne({ _id:by });
     if (!user) {
        const error = new Error("User doesnt exist");
            error.statusCode = 404;
            throw error;
     }

     const existingAppointment = await Appointment.findOne({
        patient_id,
        date
      });

      if (existingAppointment) {
        const error = new Error("Appointment Already Exists");
            error.statusCode = 400;
            throw error;
      }

    

    if (patient_id || by || reason || date ) {
        
        const newAppointment = new Appointment({patient_id, by,reason,date, notes,status});
        const output= await newAppointment.save();
        if (output) {
            res.status(201).json({message:"Appointment Added Successfully"})
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
      .populate('patient_id')
      .populate('by', '-password');
  
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
    const { id } = req.params;
  
    const updateData = req.body; // Request body should contain the updated patient data
    const patient = await Patient.findOne({ _id:updateData.patient_id });
    if (!patient) {
        const error = new Error("Patient doesnt exist");
        error.statusCode = 404;
        throw error;
     }

    const user = await User.findOne({ _id:updateData.by });
     if (!user) {
        const error = new Error("User doesnt exist");
            error.statusCode = 404;
            throw error;
     }
    // Ensure that "name" and "owner" fields are required
    if (!updateData.patient_id || !updateData.by || !updateData.reason || !updateData.date) {
        const error = new Error('Check Required Fields');
        error.statusCode = 400;
        throw error;
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true });

    if (updatedAppointment) {
      return res.status(201).json({ message: 'Appointment updated successfully' });
    }else{
        const error = new Error('Appointment Not Found');
        error.statusCode = 400;
        throw error;
    }
    
  });

  export const deleteAppointment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (id) {
        const deleteAppointment = await Appointment.findByIdAndDelete(id);

        if (!deleteAppointment) {
            const error = new Error('Appointment Not Found');
            error.statusCode = 404;
            throw error;
        }

        res.status(201).json({ message: 'Appointment deleted successfully' });
    }else{
        const error = new Error('Invalid Request');
        error.statusCode = 400;
        throw error;
    }
    
  });