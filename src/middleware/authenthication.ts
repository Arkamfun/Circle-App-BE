import { NextFunction,Request, Response } from "express";
import jwt from 'jsonwebtoken'

export function authentication(req:Request, res:Response, next:NextFunction) {

    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const authorizationHeader = req.header("Authorization") //salah satu bagian header untuk memasukkan token kaliain
    if(!authorizationHeader || !authorizationHeader.startsWith("Bearer") ) {
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    const token = authorizationHeader.replace("Bearer ","")

    if(!token) {
        return res.status(401).json({
            message:"Authoritation is not Found"
        })
    }

    try {
        const secretKey = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token,secretKey );
        (req as any).user = decoded;
        next();
    }catch(error) {
        return res.status(401).json({success: false, message:"invalid token"})
    }
}


// note : authentication ini digunakan untuk pengecekan dari token jwt ke dalam bentuk data dari dalam token, gampangnya ini untuk mmengubah token jwt ke dalam bentuk data.

// authentication ini berguna untuk melindungi suatu enpoint yang membutuhkan login dulu, kyk profile, dashboard, atau apapun yang terkait data pribadi dari client atau user