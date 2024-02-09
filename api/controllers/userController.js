import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import bcrypt from "bcrypt"

import User from '../server/models/userModel.js';
import Credential from '../server/models/loginModel.js';


export const getUser = asyncHandler(async(req, res) => {
  const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

  const skip = (page - 1) * pageSize;

  const totalUsers = await User.countDocuments();
  const totalPages = Math.ceil(totalUsers / pageSize); 
  const users = await User.find({ role: { $in: ["admin", "employee"] } }).sort({ createdAt: -1 }) // Sort by createdAt in descending order for latest first
  .skip(skip)
  .limit(pageSize);

  if (users) {
    res.status(200).json({
      page,
      pageSize,
      totalPages,
      data:users
    });
  } else {
    const error = new Error("No users Found");
    error.statusCode = 404;
    throw error;
  }
})

export const userLogin = asyncHandler(async (req, res) => {
        const { username, password } = req.body;

        if (username==="" || password==="") {
          
          const error = new Error("Logins Required");
          error.statusCode = 400;
          throw error;
        }

        const findUser= await Credential.findOne({username})


        if (!findUser) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        
        }
        const passwordMatch = await bcrypt.compare(password, findUser.password);

        if ( passwordMatch) {
          const user = await Credential.findOne({ username }).select('-password').populate('user');


          const token = jwt.sign({ username }, process.env.API_SECRET, { expiresIn: '24h' });

          res.cookie('token', token, { 
            httpOnly: true , 
            sameSite: 'none',
            secure:true,
            domain: '.petfarm.onrender.com'
          })
          .status(200)
          .json({ message: 'Login successful',
            user,
      });
        } else {
          const error = new Error("Invalid Credentials");
          error.statusCode = 401;
          throw error;
        }
        
        
      
})

export const userSignUp = asyncHandler(async (req, res) => {
    const { username, name, email, password, role, phone } = req.body;

   
    if (username === "" || email == "" || phone == "" || password==="" || name==='' ) {
      const error = new Error("check your inputs");
      error.statusCode = 400;
      throw error;
      
    }else{

      const existingMail = await User.findOne({ email });
      const existingUserName = await Credential.findOne({ username });
  
      if (existingUserName) {
        const error = new Error("Username already taken");
        error.statusCode = 400;
        throw error;
      }

      if (existingMail) {
        const error = new Error("Email already taken");
        error.statusCode = 400;
        throw error;
      }
  
      // Create a new user with the hashed password
      const newUser = new User({ email,  phone, role, name });
      const output= await newUser.save();
  
      if (output){

        const addCredentials = new Credential({user:output._id, username, password})
        const saveLogin = await addCredentials.save()
        if (saveLogin) {
          
          res.status(201).json({ message: 'User registered successfully'});
        }
      }else{
        const error = new Error("something wrong happenned, try again");
        error.statusCode = 400;
        throw error;
      }
    }
  
})

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(id);
  if (!id) {
    const error = new Error("User Id is required");
    error.statusCode = 400;
    throw error;
  }
  const user = await Credential.findOne({user:id}).select("-password").populate('user');

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
      };

      res.status(200).json(user);
    
      
});

export const userUpdateFn = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const { username, name, email, role, phone } = req.body;

  console.log('register')
  
  if (username === "" || email == "" || phone == "" || name==='' ) {
    const error = new Error("check your inputs");
    error.statusCode = 400;
    throw error;
    
  }

    const existingUserName = await Credential.findOne({ username, user: { $ne: id } });

    const existingPhone = await User.findOne({ phone, _id: { $ne: id } });
    const existingMail = await User.findOne({ email, _id: { $ne: id } });

    if (existingUserName) {
      const error = new Error("Username already taken");
      error.statusCode = 400;
      throw error;
    }

    if (existingPhone) {
      const error = new Error("Phone already taken");
      error.statusCode = 400;
      throw error;
    }

    if (existingMail) {
      const error = new Error("Email already taken");
      error.statusCode = 400;
      throw error;
    }

    // Create a new user with the hashed password
    const output = await User.findByIdAndUpdate(
      id, 
      { email,  phone, role, name }, 
      {
        new: true,
      }
      );

      // console.log(output);

    if (output){

      const updateCredentials = await Credential.findOneAndUpdate(
        {user:output._id},
        {username}, 
        {
          new: true,
        }
        )
        console.log(updateCredentials);
      if (updateCredentials) {
        
        res.status(201).json({ message: 'User Updated successfully'});
      }
    }else{
      const error = new Error("something wrong happenned, try again");
      error.statusCode = 400;
      throw error;
    }
  

})

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const userExist = await User.findById(id)

  if (!userExist) {
    const error = new Error("User Not Found");
    error.statusCode = 404;
    throw error;
  }

  if (!id) {
    const error = new Error("Invalid Request");
    error.statusCode = 400;
    throw error;
  }

  const deleteUserInfo = await User.deleteOne({_id:id});
    

    if (deleteUserInfo ) {
      const deleteCredentials = await Credential.deleteOne({user:id});
      if (deleteCredentials) {
       res.status(201).json({ message: "User deleted successfully" });
        
      }else{
        const error = new Error("Delete Credentials Failed Unknown error occurred ");
        error.statusCode = 404;
        throw error;
      }

      
    }else{
      const error = new Error("Delete Failed Unknown error occurred ");
      error.statusCode = 404;
      throw error;
    }

   
});

export const userLogout = asyncHandler(async (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logout successful' });
});