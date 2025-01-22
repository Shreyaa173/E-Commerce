import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to create JWT token
const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = createToken(user._id);

        res.status(200).json({ success: true, message: "Login successful", token });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Error logging in user" });
    }
};

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email and password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password should be at least 8 characters long" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        // Generate JWT token
        const token = createToken(user._id);

        res.status(201).json({ success: true, message: "User registered successfully", token });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Create token with a proper payload object
            const token = jwt.sign(
                { 
                    email: email,
                    isAdmin: true
                }, 
                process.env.JWT_SECRET,
                { expiresIn: '24h' }  // Optional: add token expiration
            );

            res.status(200).json({
                success: true,
                message: "Admin login successful",
                token
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials"
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error logging in admin"
        });
    }
};

export { loginUser, registerUser, adminLogin };
