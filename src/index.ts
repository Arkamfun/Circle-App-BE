
import express, { Request, Response } from "express"
import { routerV1 } from "./Routes/v1";
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "../swagger/swagger-output.json"
import cors from 'cors'

const dotenv = require("dotenv")// commonJS
dotenv.config();
const app = express();
const port = process.env.PORT
app.use(express.json())


app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument,{
    explorer:true,
    swaggerOptions:{
        persistAuthorization:true,
        displayRequestDuration:true,
    }
})) 


app.get("/",(req:Request, res:Response) => {
    const {accessToken} = req.query;

    res.json({
        accessToken,
    })
})
app.use(cors())
// ini versioning api, jadi klo mau membuat version yg lebih baru kyk gini
app.use("/api/v1", routerV1)

// app.use itu dijalankan secara global, jadi app.get /post dibawah dia tetap akan menajalankan app.use dulu

// lalu buat seperti ini
//routerV1.get("/users" ,userController, find)
// app.get('/',nameUser,HelloController)
// app.get("/users",userController.findAll)   
// app.get("/users/:id",userController.findById)

// //put = ngubah seluruh data, klo gak ada dia buat data baru
// // patch = ngubah data tanpa buat data baru
// app.patch("/users",userController.update ) 
// app.delete("/users/:id",userController.delete ) 
// app.get("/users/:name",userController.findByName)   
// app.get("/users/:email",userController.findByEmail)   
app.listen(port, ()=> {

    console.log(`anjay jalan di port ${port}`)
})