import express from "express"
import { getAllCustomers, getAllPatients, getAllUsers, getModelById } from "../controllers/randomApiController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const randomRoutes = express.Router()

randomRoutes.get('/all-patients', isAuthenticated, getAllPatients)
randomRoutes.get('/all-users', isAuthenticated, getAllUsers)
randomRoutes.get('/model-by-id', isAuthenticated, getModelById)
randomRoutes.get('/all-customers', isAuthenticated, getAllCustomers)

export default randomRoutes