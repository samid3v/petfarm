import express from "express"
import { AddCustomer, deleteCustomer, editCustomer, getCustomerById, getCustomers, searchCustomer } from "../controllers/customerController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const customerRouter = express.Router()

customerRouter.get("/all",  isAuthenticated, getCustomers)
customerRouter.post("/add-customer",  isAuthenticated, AddCustomer)
customerRouter.get("/get-customer-by-id", isAuthenticated, getCustomerById)
customerRouter.put("/edit-customer", isAuthenticated, editCustomer)
customerRouter.get("/search-customer", isAuthenticated, searchCustomer)
customerRouter.delete("/delete-customer", isAuthenticated, deleteCustomer)

export default customerRouter