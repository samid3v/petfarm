import asyncHandler from 'express-async-handler';
import Dose from '../server/models/dosesModel.js';
import Vaccine from '../server/models/vaccineModel.js';
import User from '../server/models/userModel.js';


export const getAllDosesById = asyncHandler(async(req, res) =>{
     const {id} = req.query

     const doses = await Dose.find({vaccine:id})
     .populate('vet')
     console.log(doses)
     if (!doses) {
          const error = new Error("Error fetching dose info");
          error.statusCode = 400;
          throw error;
     }

     res.status(200).json(doses)
})

export const addDosesFn = asyncHandler(async (req, res)=>{
     const {date, vet, administered, vaccine} = req.body

     if (!date || !vet || !vaccine ) {
          const error = new Error("Check required fields");
          error.statusCode = 400;
          throw error;
     }

     const vaccineExist = await Vaccine.findById({_id:vaccine})
     const vetExist = await User.findById({_id:vet})
     const doseExist = await Dose.findOne({vaccine:vaccine, date:date})

     if (doseExist) {
          const error = new Error("Vaccine Dose record already added");
          error.statusCode = 400;
          throw error;
     }

     if (!vaccineExist) {
          const error = new Error("Vaccine Not Found");
          error.statusCode = 400;
          throw error;
     }

     if (!vetExist) {
          const error = new Error("Vet Not Found");
          error.statusCode = 400;
          throw error;
     }

     const allDoses = await Dose.find({vaccine})

     if (vaccineExist.total_doses===allDoses.length) {
          const error = new Error("Maximum Doses Reached");
          error.statusCode = 400;
          throw error;
     }
    
     let status = vaccineExist.status

     const dose = new Dose({
          date, 
          vet, 
          administered,
          vaccine
     });
     const output= await dose.save();


     if (output) {
          const findDoses = await Dose.find({vaccine, administered:true})
          if (vaccineExist.total_doses===findDoses.length) {
               status = 'Completed'
          }
          const InProgress = await Dose.find({vaccine})

          if (findDoses.length>0 && vaccineExist.total_doses>InProgress.length) {
               status = 'In Progress'
          }
          if (findDoses) {
               const updateVaccine = await Vaccine.findByIdAndUpdate(
                    vaccine
               ,{
                    doses_administered:findDoses.length, 
                    status,
               }, { new: true } )
          }
               res.status(201).json({message:'Dose added successfully'})

     }


})

export const getSingleDoseFn = asyncHandler(async (req, res) => {
     const { id } = req.query;
   
     if (!id) {
       const error = new Error("Dose id is Required");
       error.statusCode = 404;
       throw error;
        
     }

     const dose = await Dose.findById(id);

     if (!dose) {
          const error = new Error("Dose not found");
          error.statusCode = 404;
          throw error;
       }

     res.status(200).json(dose);

   });

 

export const editDosesFn = asyncHandler(async (req, res)=>{
     const {date,id, vet, administered, vaccine} = req.body

      console.log('edit doses')

     if (!date || !vet || !vaccine || !id ) {
          const error = new Error("Check required fields");
          error.statusCode = 400;
          throw error;
     }

     const vaccineExist = await Vaccine.findById({_id:vaccine})
     const vetExist = await User.findById({_id:vet})
     const doseExist = await Dose.findById(id)

     let status = vaccineExist.status


     if (!doseExist) {
          const error = new Error("Vaccine Dose record Not Found");
          error.statusCode = 400;
          throw error;
     }

     if (!vaccineExist) {
          const error = new Error("Vaccine Not Found");
          error.statusCode = 400;
          throw error;
     }

     if (!vetExist) {
          const error = new Error("Vet Not Found");
          error.statusCode = 400;
          throw error;
     }

     const dose = await Dose.findByIdAndUpdate(id,{
          date, 
          vet, 
          administered,
          vaccine
     },
     {new:true}
     );


     if (dose) {
          const findDoses = await Dose.find({vaccine, administered:true})
          if (vaccineExist.total_doses===findDoses.length) {
               status = 'Completed'
          }
          if (findDoses.length>0) {
               status = 'In Progress'
          }
          if (findDoses.length===0) {
               status = 'Pending'
          }
          if (findDoses) {
               const updateVaccine = await Vaccine.findByIdAndUpdate(
                    vaccine
               ,{
                    doses_administered:findDoses.length, 
                    status,
               }, { new: true } )
          }
               res.status(201).json({message:'Dose Record Updated successfully'})

     }


})

export const deleteDoseFn = asyncHandler(async (req, res) => {
     const { id } = req.query;
   
     if (id) {
       const deleteDose = await Dose.findByIdAndRemove(id);
   
       if (!deleteDose) {
         const error = new Error("Vaccine Dose Not Found");
         error.statusCode = 404;
         throw error;
       }

       console.log('delete dose',deleteDose)

       if (deleteDose) {
          const vaccine = await Vaccine.findOne({_id:deleteDose.vaccine})

          let status = vaccine.status

          const findDoses = await Dose.find({vaccine:deleteDose.vaccine, administered:true})
          if (findDoses.length===0) {
               status = 'Pending'
          }
          
           await Vaccine.findByIdAndUpdate(
               vaccine._id,

               {
                    doses_administered:findDoses.length,
                    status
               },
               {new:true}
               
               )

               
               res.status(201).json({ message: "Vaccine dose deleted successfully" });
                    

          // const allDose = await Dose.find({vaccine:deleteDose.vaccine})
       }
   
     } else {
       const error = new Error("Invalid Request");
       error.statusCode = 400;
       throw error;
     }
   });