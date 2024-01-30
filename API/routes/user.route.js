import express from "express"
import { deleteUser, getUser, getUsers } from "../controller/user.controller.js"
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router()

//Approach 1:-
// router.get("/test", (req,res)=>{
//     res.send("it works..")
// })

//Approach 2:-
router.delete("/delete/:id", verifyToken, deleteUser )
router.get("/:id", verifyToken, getUser )
router.get("/", verifyToken, getUsers )


export default router;