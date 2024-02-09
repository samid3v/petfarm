import express from "express"
import { addTransactions, deleteTransaction, fetchTransactions } from "../controllers/transactionController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const transactionRoutes = express.Router()

transactionRoutes.get("/all", isAuthenticated, fetchTransactions)
transactionRoutes.post("/add-transaction", isAuthenticated, addTransactions)
transactionRoutes.delete("/delete-transaction", isAuthenticated, deleteTransaction)

export default transactionRoutes

