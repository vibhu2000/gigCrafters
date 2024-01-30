import User from "../models/user.models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createErrors from "../utils/createErrors.js"

export const register = async (req, res, next) => {
    try {
        // creating new user instance
        // const newUser = new User ({
        //     username:"test",
        //     email:"test",
        //     password:"test",
        //     country:"test"
        // })

        // you can write any number (ex. we take 5)
        const hash = bcrypt.hashSync(req.body.password, 5)
        const newUser = new User ({
            // body me jo bhi information hai remaining unko lelo
            // spread operator (...)
            ...req.body,
            password:hash,
        }) 


        // const newUser = new User (req.body)        

        // using mongoose we save the data
        await newUser.save()
        res.status(201).send("User has been created....")

    } catch (error) {
        // res.status(500).send("Something went wrong!!!")
        next(error)
    }

}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
       
        if(!user) return next(createErrors(404, "User not found!"))

        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if(!isCorrect) return next(createErrors(400, "Incorrect username or password!!!!"))
                                //req.status(400).send("Incorrect username or password!!!")

        // generating token
        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller // bcoz with help of this this user is not allowed to review
        }, process.env.JWT_KEY)

        // we are fetching password and other details in 2 different variables
        const{password, ...info} = user._doc
        res.cookie("accessToken", token, {httpOnly: true}).status(200).send(info)
        
    } catch (error) {
        next(error)
        // res.status(500).send("Something went wrong!!!")
    }

}

export const logout = async (req, res) => {
   res.clearCookie("accessToken",{
    sameSite: "none",
    secure: true,
   }).status(200).send("User has been logged out.");

}; 