import express from "express"
import { deleteUser, getUser, getUserById, userLogin, userLogout, userSignUp, userUpdateFn } from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdminHandler.js";

const userRouter = express.Router()

userRouter.get("/all",  getUser)

userRouter.post('/login', userLogin);
userRouter.post('/logout', isAuthenticated, userLogout);

userRouter.post('/register', isAuthenticated, userSignUp);
userRouter.get('/user-by-id', isAuthenticated, getUserById);
userRouter.put('/update-user', isAuthenticated, userUpdateFn);
userRouter.delete('/delete-user', isAuthenticated, deleteUser);

export default userRouter
