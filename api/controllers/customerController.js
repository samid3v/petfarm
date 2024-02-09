import asyncHandler from "express-async-handler";

import User from "../server/models/userModel.js";
import Patient from "../server/models/patientModel.js";

export const getCustomers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

  const skip = (page - 1) * pageSize;

  const totalPatients = await Patient.countDocuments();
  const totalPages = Math.ceil(totalPatients / pageSize); 
  const customers = await User.find({ role: "customer" }).sort({ createdAt: -1 }) // Sort by createdAt in descending order for latest first
  .skip(skip)
  .limit(pageSize);

  if (customers) {
    res.status(200).json({
      page,
      pageSize,
      totalPatients,
      totalPages,
      data:customers
    });
  } else {
    const error = new Error("No Customers Found");
    error.statusCode = 404;
    throw error;
  }
});

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailPattern.test(email);
}

export const AddCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone, county, sub_county, ward, street } = req.body;

  if (phone.length !== 12) {
    const error = new Error("invalid phone number");
    error.statusCode = 400;
    throw error;
  }

    if (!validateEmail(email)) {
      const error = new Error("invalid email");
      error.statusCode = 400;
      throw error;
    }

  if (name == "" || phone == "" ||  email == "") {
    const error = new Error("check your inputs");
    error.statusCode = 400;
    throw error;
  }

  const cleanedPhoneNumber = phone.replace(/\D/g, '');

  const regex = /^254/;


  const isPhoneOk = await regex.test(cleanedPhoneNumber);

  if (!isPhoneOk) {
  console.log(cleanedPhoneNumber);

    const error = new Error("Incorrect Phone Number");
    error.statusCode = 400;
    throw error;
  }

  const existingPhone = await User.findOne({ phone });
  const existingMail = await User.findOne({ email });
  // const usernameExist = await User.findOne({ email });

  if (existingPhone) {
    const error = new Error("Phone already exists");
    error.statusCode = 400;
    throw error;
  }

    if (existingMail) {
      const error = new Error("Email already exists");
      error.statusCode = 400;
      throw error;
    }
    
  
    const newUser = new User({
      name,
      email,
      phone:cleanedPhoneNumber                            ,
      county, 
      sub_county, 
      ward,
      street,
      role: "customer",
    });
    const output = await newUser.save();

    if (output) {
      res
        .status(201)
        .json({
          message: "Customer registered successfully"
        });
    } else {
      const error = new Error("something wrong happenned, try again");
      error.statusCode = 400;
      throw error;
    }
  
});

export const getCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (id) {
    const customer = await User.findById(id).select("-password");

    if (customer) {
      const patients = await Patient.find({ owner: id });
      const customerWithPatients = {
        ...customer.toObject(),
        patients: patients,
      };
      res.status(200).json(customerWithPatients);
    } else {
      const error = new Error("Customer  not found");
      error.statusCode = 404;
      throw error;
    }
  } else {
    const error = new Error("Invalid Request");
    error.statusCode = 400;
    throw error;
  }
});



export const editCustomer = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const {name, email, phone, county, sub_county, ward,street} = req.body;

  if (name == "" || phone == "" ||  email == "") {
    const error = new Error("check your inputs");
    error.statusCode = 400;
    throw error;
  }

  if (phone.length !== 12) {
    const error = new Error("invalid phone number");
    error.statusCode = 400;
    throw error;
  }

    if (!validateEmail(email)) {
      const error = new Error("invalid email");
      error.statusCode = 400;
      throw error;
    }

    const cleanedPhoneNumber = phone.replace(/\D/g, '');

    const regex = /^254/;

    const isPhoneOk = regex.test(cleanedPhoneNumber);

    if (!isPhoneOk) {
      const error = new Error("Incorrect Phone Number");
      error.statusCode = 400;
      throw error;
    }

  

  const existingPhone = await User.findOne({ phone, _id: { $ne: id } });
  const existingMail = await User.findOne({ email, _id: { $ne: id } });

  if (existingPhone) {
    const error = new Error("Phone already exists");
    error.statusCode = 400;
    throw error;
  }

    if (existingMail) {
      const error = new Error("Email already exists");
      error.statusCode = 400;
      throw error;
    }
    
 
  const updatedPatient = await User.findByIdAndUpdate(id, {
    name, email, phone:cleanedPhoneNumber, county, sub_county, ward, street
  }, {
    new: true,
  });

  if (updatedPatient) {
    return res.status(201).json({ message: "Customer updated successfully" });
  } else {
    const error = new Error("Customer Not Found");
    error.statusCode = 400;
    throw error;
  }
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const customerExist = await User.findById(id)

  if (!customerExist) {
    const error = new Error("Customer Not Found");
    error.statusCode = 404;
    throw error;
  }

  if (id) {
    const deleteCustomer = await User.deleteOne({_id:id});

    if (!deleteCustomer) {
      const error = new Error("Delete Failed Unknown error occurred ");
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json({ message: "Customer deleted successfully" });
  } else {
    const error = new Error("Invalid Request");
    error.statusCode = 400;
    throw error;
  }
});

export const searchCustomer = asyncHandler(async (req, res) => {
  const { value } = req.query;

  if (!value) {
    const error = new Error('Missing Search Value');
    error.statusCode = 404;
    throw error;
  }

  try {
    const query = {
      $or: [
        { name: { $regex: new RegExp(value, 'i') } },
        { email: { $regex: new RegExp(value, 'i') } },
        { phone: { $regex: new RegExp(value, 'i') } },
        { county: { $regex: new RegExp(value, 'i') } },
        { sub_county: { $regex: new RegExp(value, 'i') } },
        { ward: { $regex: new RegExp(value, 'i') } },
      ],
      role: 'customer', // Add the role condition here
    };

    const results = await User.find(query);
    res.json(results);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
