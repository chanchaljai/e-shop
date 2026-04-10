import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//Signup user
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
   
    
    // check if user exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "User already exist" });
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
    res.json({message: "User registerd successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Login user
export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //Genrate JWT Token
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};