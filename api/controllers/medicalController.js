import asyncHandler from 'express-async-handler';
import Patient from '../server/models/patientModel.js';
import Appointment from '../server/models/appointmentsModel.js';
import User from '../server/models/userModel.js';
import Medication from '../server/models/medicationModel.js';

export const getAllMedical = asyncHandler(async(req, res) => {
    const medication = await Medication.find()

    res.status(200).json(medication)
})

export const addMedical = asyncHandler(async(req, res) => {
    const {name, description, cost_per_unit, unit, quantity_in_stock, expiry_date} = req.body

    if (!name || !cost_per_unit || !unit) {
        const error = new Error("Check Required Inputs");
        error.statusCode = 400;
        throw error;
     }
        
      const newMedication = new Medication({name, description, cost_per_unit, unit, quantity_in_stock, expiry_date});
      const output= await newMedication.save();
      if (output) {
          res.status(201).json({message:"Medication Added Successfully"})
      }else{
          const error = new Error("something wrong happenned, try again");
          error.statusCode = 400;
          throw error;
      }

})

export const getMedicalById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (id) {
      const medicalStock = await Medication.findById(id)
  
      if (medicalStock) {
        res.status(200).json(medicalStock);
      } else {
        const error = new Error('Medical Stock not found');
        error.statusCode = 404; // Correct the status code to 404 for "Not Found"
        throw error;
      }
    } else {
      const error = new Error('Invalid Request');
      error.statusCode = 400;
      throw error;
    }
  });

  export const editMedical = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const updateData = req.body; // Request body should contain the updated patient data 
    // Ensure that "name" and "owner" fields are required
    if (!updateData.name || !updateData.cost_per_unit || !updateData.unit || !updateData.quantity_in_stock) {
        const error = new Error('Check Required Fields');
        error.statusCode = 400;
        throw error;
    }

    const updatedAppointment = await Medication.findByIdAndUpdate(id, updateData, { new: true });

    if (updatedAppointment) {
      return res.status(201).json({ message: 'Medical Stock updated successfully' });
    }else{
        const error = new Error('Medical Stock Not Found');
        error.statusCode = 400;
        throw error;
    }
    
  });

  export const deleteMedical = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (id) {
        const deleteMedicationStock = await Medication.findByIdAndDelete(id);

        if (!deleteMedicationStock) {
            const error = new Error('Medication Stock Not Found');
            error.statusCode = 404;
            throw error;
        }

        res.status(201).json({ message: 'Medication Stock deleted successfully' });
    }else{
        const error = new Error('Invalid Request');
        error.statusCode = 400;
        throw error;
    }
    
  });