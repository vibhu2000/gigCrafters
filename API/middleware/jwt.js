import createErrors from "../utils/createErrors.js";
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next)=>{
   
    const token = req.cookies.accessToken;
    if(!token) return next(createErrors(401, "You are not Authenticated!!!"))
    // res.status(401).send("You are not Authenticated!!!")

    jwt.verify(token, process.env.JWT_KEY, async(err,payload)=>{
        if(err) return next(createErrors(403, "Token is not valid!"))
                    //res.status(403).send("Token is not valid")
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        next()
    });
}