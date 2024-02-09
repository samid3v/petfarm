import express from "express"
import { addDosesFn, deleteDoseFn, editDosesFn, getAllDosesById, getSingleDoseFn } from "../controllers/dosesController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const doseRouter = express.Router()

doseRouter.get("/all", isAuthenticated, getAllDosesById)
doseRouter.post("/add-dose", isAuthenticated, addDosesFn)
doseRouter.get("/get-single-dose", isAuthenticated, getSingleDoseFn)
// doseRouter.get("/get-patients", getPatients)
doseRouter.put("/edit-dose", isAuthenticated, editDosesFn)
// doseRouter.put("/edit-boarder-status", editBoarderStatus)
doseRouter.delete("/delete-dose", isAuthenticated, deleteDoseFn)

export default doseRouter