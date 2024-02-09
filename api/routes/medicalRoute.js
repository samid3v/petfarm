import express from "express"
import { addMedical, deleteMedical, editMedical, getAllMedical, getMedicalById } from "../controllers/medicalController.js"

const medicalRouter = express.Router()

medicalRouter.get("/all", getAllMedical)
medicalRouter.post("/add-medical", addMedical)
medicalRouter.get("/get-medical-by-id/:id", getMedicalById)
medicalRouter.put("/edit-medical/:id", editMedical)
medicalRouter.delete("/delete-medical/:id", deleteMedical)

export default medicalRouter