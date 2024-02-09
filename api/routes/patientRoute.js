import express from "express"
import { addPatients, deletePatient, editPatient, getAllPatients, getPatientById, searchPatient } from "../controllers/patientController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const patientRouter = express.Router()

patientRouter.get("/all", isAuthenticated, getAllPatients)
patientRouter.post("/add", isAuthenticated, addPatients)
patientRouter.get("/get-patient-by-id", isAuthenticated, getPatientById)
patientRouter.put("/edit-patient", isAuthenticated, editPatient)
patientRouter.get("/search-patient", isAuthenticated, searchPatient)
patientRouter.delete("/delete-patient", isAuthenticated, deletePatient)

export default patientRouter