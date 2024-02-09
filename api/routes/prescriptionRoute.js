import express from "express"
import { addTreatment, deleteTreatment, editTreatment, getAllTreatments, getTreatmentById } from "../controllers/treatmentController.js"

const prescriptionRouter = express.Router()

prescriptionRouter.get("/all", getAllTreatments)
prescriptionRouter.post("/add-treatment", addTreatment)
prescriptionRouter.get("/get-treatment-by-id/:id", getTreatmentById)
prescriptionRouter.put("/edit-treatment/:id", editTreatment)
prescriptionRouter.delete("/delete-treatment/:id", deleteTreatment)

export default prescriptionRouter