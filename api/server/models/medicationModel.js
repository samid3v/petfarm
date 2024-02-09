import mongoose from "mongoose";

const MedicationSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    description:{
        type: String
    },
    unit: {
        type: String, // Store the unit of measurement, e.g., "tablet," "ml," "mg," etc.
        required: true,
      },
    cost_per_unit:{
        type: Number,
        min: 0
    },
    quantity_in_stock: {
        type: Number,
        default: 0, // Initialize to 0, and update as needed
      },
      expiry_date: {
        type: Date,
      },
    
},{timestamps:true})

 const Medication = mongoose.model('Medications', MedicationSchema)

 export default Medication