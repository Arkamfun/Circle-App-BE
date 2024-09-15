import express, { Express } from "express"; //ES6
import { HelloController } from "./controller/HelloController";
import userController from "./controller/userController";
import { nameUser } from "./middleware/NameUser";
import { errorHandler } from "./middleware/error";
const dotenv = require("dotenv")// commonJS
dotenv.config();
const app : Express = express();
const port = process.env.PORT
// app.use itu dijalankan secara global, jadi app.get /post dibawah dia tetap akan menajalankan app.use dulu
app.use(errorHandler)

app.get('/',nameUser,HelloController)
app.get("/users",userController.findAll)   
app.get("/user/:id",userController.findById)   
// app.get("/users/:name",userController.findByName)   
// app.get("/users/:email",userController.findByEmail)   
app.listen(port, ()=> {
    console.log(`anjay jalan di port ${port}`)
})