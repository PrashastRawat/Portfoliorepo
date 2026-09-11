import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try{
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ message: "Name and password are required" });
        }

        const admin = await Admin.findOne({ name });
        if (!admin) {
            return res.status(401).json({ message: "Invalid name or password" });
        }
        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid name or password" });
        }

        const token = jwt.sign({id:admin._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
        res.status(200).json({ message: "Login successful" });
    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/logout", (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
})

router.get("/check", requireAuth, (req,res)=>{
    res.status(200).json({ authenticated: true, admin: req.adminId });
})

export default router;