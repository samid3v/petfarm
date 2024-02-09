import mongoose from "mongoose";

const doseSchema = new mongoose.Schema({
     vaccine: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Vaccines',
       required: true,
     },
     date: {
       type: Date,
       required: true,
     },
     administered: {
       type: Boolean,
       default: false,
     },
     vet: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Users', 
     },
   });
   
   const Dose = mongoose.model('Doses', doseSchema);
   
   export default Dose
   