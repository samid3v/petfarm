import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { moduleStats, upcomingAppointmentsFn, upcomingVaccinesFn } from "../controllers/analyticsController.js"

const analyticsRouter = express.Router()

analyticsRouter.get("/module-stats", isAuthenticated, moduleStats)
analyticsRouter.get("/upcoming-appointments", isAuthenticated, upcomingAppointmentsFn)
analyticsRouter.get("/upcoming-vaccines", isAuthenticated, upcomingVaccinesFn)

export default analyticsRouter