import e from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


const signupUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        // check if user exist
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({error: "User already exist"});
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.json({massage: "User created successfully"});
        
        
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export {signupUser};
    
        