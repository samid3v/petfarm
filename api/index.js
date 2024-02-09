import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/userRoute.js"
import errorHandler from "./middlewares/errorHandler.js"
import { connectDB } from "./server/db/connectDb.js"
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors"
import patientRouter from "./routes/patientRoute.js"
import appointmentRouter from "./routes/appointmentRoute.js"
import medicalRouter from "./routes/medicalRoute.js"
import treatmentRouter from "./routes/treatmentRoute.js"
import boardingRouter from "./routes/boardingRoute.js"
import customerRouter from "./routes/customerRoute.js"
import transactionRoutes from "./routes/transactionRoute.js"
import randomRoutes from "./routes/randomRoutes.js"
import vaccineRouter from "./routes/vaccineRoutes.js"
import doseRouter from "./routes/doseRoute.js"
import analyticsRouter from "./routes/analytictsRoute.js"

dotenv.config()

const port = process.env.PORT || 5000

const app = express()

app.use(cors({ origin: 'https://petfarm.onrender.com', credentials: true }));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cookieParser());

//endpoints
app.use("/api/users", userRouter)
app.use("/api/patients", patientRouter)
app.use("/api/appointments", appointmentRouter)
app.use("/api/medical", medicalRouter)
app.use("/api/treatments", treatmentRouter)
app.use("/api/boarding", boardingRouter)
app.use("/api/customers", customerRouter)
app.use("/api/transactions", transactionRoutes)
app.use("/api/random", randomRoutes)
app.use("/api/vaccines", vaccineRouter)
app.use("/api/doses", doseRouter)
app.use("/api/analytics", analyticsRouter)

app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
    connectDB()
})