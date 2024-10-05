import express, { Request, Response } from "express"
import { nameUser } from "../middleware/NameUser";
import userController from "../controller/user.Controller";
import authController from "../controller/auth.Controller";
import { authentication } from "../middleware/authenthication";
import { authorize } from "../middleware/authorize";
import threadController from "../controller/threadController";
import { upload } from "../middleware/upload-file";
export const routerV1 = express.Router();

// lalu buat seperti ini
//routerV1.get("/users" ,userController, find)
//put = ngubah seluruh data, klo gak ada dia buat data baru
// patch = ngubah data tanpa buat data baru

routerV1.get("/users", userController.findAll);
routerV1.get("/getuser", authentication, userController.getUser);
routerV1.get("/users/:id", userController.findById);
routerV1.get("/users/email/:email", userController.findByEmail);
routerV1.post("/users", userController.create);
routerV1.post('/logout',(req:Request, res:Response) => {
    res.clearCookie('token');
    return res.status(200).json({message: 'Logout success'})
})
routerV1.patch("/users/editprofile/:id", userController.update);

// thread routes
routerV1.get("/thread", threadController.showAll)
routerV1.get("/thread/:threadId", threadController.findID.bind(threadController))
routerV1.post("/thread", authentication, upload.single("image"), threadController.create)
routerV1.patch("/thread/:id", authentication, threadController.updateThread)
routerV1.delete("/thread/:id", authentication, threadController.deleteThread)
routerV1.post("/auth/login", authController.login)
routerV1.post("/auth/register", authController.register)
routerV1.get("/auth/check", authentication, authController.check)
routerV1.get("/dashboard", authentication, authorize("ADMIN"), (req, res) => {
    res.json({ message: "hello from dashboard" })
})