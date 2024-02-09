import mongoose from "mongoose";
import Payment from "./paymentModel.js";

const TreatmentSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required:true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required: true,
    },
    vet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    notes:{
        type: String,
    },
    date: {
        type: Date,
        get: function (val) {
        if (!val) return val;
            return val.toISOString().split('T')[0];
        },
        default: Date.now, 
    },
    
},{timestamps:true})

TreatmentSchema.pre('deleteOne', async function() {
    const module_id = this._conditions._id;
    await Payment.deleteOne({ module_id });
});

const Treatment = mongoose.model('Treatments', TreatmentSchema)

export default Treatment