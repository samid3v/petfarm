import mongoose from "mongoose";
import bcrypt from "bcrypt"

const CredentialSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required:true,
},
    username:{
      type: String,
      unique:true,
      required: true,
    },
    password:{
        type: String,
        required: true
    },
    
},{timestamps:true})


CredentialSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      error.statusCode = 400;
      throw error;
    }
  });

 const Credential = mongoose.model('Credentials', CredentialSchema)

 export default Credential