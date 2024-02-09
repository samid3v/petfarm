import asyncHandler from 'express-async-handler';
import User from '../server/models/userModel.js';
import Patient from '../server/models/patientModel.js';
import mongoose from 'mongoose';

export const getAllPatients = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

  const skip = (page - 1) * pageSize;

  const totalPatients = await Patient.countDocuments();
  const totalPages = Math.ceil(totalPatients / pageSize); // Calculate total pages

  const patients = await Patient.find().populate('owner', '-password')
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order for latest first
    .skip(skip)
    .limit(pageSize);

  const hasNextPage = page * pageSize < totalPatients;
  const hasPreviousPage = page > 1;

  res.status(200).json({
    page,
    pageSize,
    totalPatients,
    totalPages, 
    hasNextPage,
    hasPreviousPage,
    data: patients,
  });
});


export const addPatients = asyncHandler(async(req, res) => {
    const {name, species,breed,age, a_unit, weight,gender, w_unit, owner} = req.body
   
    if (!name || !owner || !gender || !age || !weight) {
      const error = new Error("Validation failed. Check required fields.");
      error.statusCode = 400;
      throw error;
    }
  
    // Check if patient with the same name already exists
    const exist = await Patient.findOne({ name });
    if (exist) {
      const error = new Error("Patient Name Already Taken");
      error.statusCode = 400;
      throw error;
    }
  
    // Validate owner existence
    const ownerId = new mongoose.Types.ObjectId(owner);
    const user = await User.findOne({ _id: ownerId });
    if (!user) {
      const error = new Error("User doesn't exist");
      error.statusCode = 400;
      throw error;
    }
  
    // Create and save new patient
    const newPatient = new Patient({ 
      name, 
      species, 
      breed, 
      age,
      gender,
      a_unit,
      weight,
      w_unit,
      owner 
    });
    const output = await newPatient.save();
  
    if (output) {
      res.status(201).json({ message: "Patient Added Successfully" });
    } else {
      const error = new Error("Something went wrong, please try again.");
      error.statusCode = 500; // Internal Server Error
      throw error;
    }

})

export const getPatientById = asyncHandler(async (req, res) => {
    const { id } = req.query;
  
    if (id) {
      const patient = await Patient.findById(id).populate('owner', '-password');
  
      if (patient) {
        res.json(patient);
      } else {
        const error = new Error('Patient not found');
        error.statusCode = 404; // Correct the status code to 404 for "Not Found"
        throw error;
      }
    } else {
      const error = new Error('Invalid Request');
      error.statusCode = 400;
      throw error;
    }
  });

  export const editPatient = asyncHandler(async (req, res) => {
    const { id } = req.query;
  
    const {name, species,breed,age, a_unit, weight,gender, w_unit, owner} = req.body

    // Ensure that "name" and "owner" fields are required
    if (!name || !owner || !gender || !age || !weight) {
      const error = new Error("Validation failed. Check required fields.");
      error.statusCode = 400;
      throw error;
    }

    const updatedPatient = await Patient.findByIdAndUpdate(id, {
      name, 
      species, 
      breed, 
      age,
      gender,
      a_unit,
      weight,
      w_unit,
      owner 
    }, { new: true });

    if (updatedPatient) {
      return res.status(201).json({ message: 'Patient updated successfully' });
    }else{
        const error = new Error('Patient Not Found');
        error.statusCode = 400;
        throw error;
    }
    
  });

  export const searchPatient = asyncHandler(async (req, res) => {
    const { value } = req.query;
  
    
  if (!value) {
    const error = new Error('Missing Search Value');
    error.statusCode = 404;
    throw error;
  }

  const query = {};


  try {
    const owners = await User.find({ name: new RegExp(value, 'i') });
    
    const ownerIds = owners.map(owner => owner._id);

    if (value) {
      query.$or = [
        { name: { $regex: new RegExp(value, 'i') } },
        { breed: { $regex: new RegExp(value, 'i') } },
        { species: { $regex: new RegExp(value, 'i') } },
        { owner: { $in: ownerIds } },
      ];
    }

    const results = await Patient.find(query).populate('owner', '-password');

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
    
  });

  export const deletePatient = asyncHandler(async (req, res) => {
    const { id } = req.query;

    if (!id) {
     
        const error = new Error('Id param not found');
        error.statusCode = 400;
        throw error;
    }findOne

    const patientExist = await Patient.findById(id);

        if (!patientExist) {
            const error = new Error('Patient Not Found');
            error.statusCode = 404;
            throw error;
        }

    const deletePatient = await Patient.findByIdAndDelete(id);

    if (deletePatient) {
      res.status(201).json({ message: 'Patient deleted successfully' });
      
    }

    
  });