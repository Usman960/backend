const bcrypt = require("bcrypt");
const User = require("../models/User");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")

// Sign Up
router.post("/signup", async (req, res) => {
    try {
        const { email, password, fullName, admin } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.json({ msg: "USER ALREADY EXISTS" });

        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = await User.create({
            email,
            password: hashedPassword,
            fullName,
            admin
        });
        res.json({ msg: "USER ADDED" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })
        
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ msg: "WRONG PASSWORD" })

        const token = jwt.sign({
            email,
            createdAt: new Date(),
            userId:user._id,
            admin: user.admin,
        }, "MY_SECRET", { expiresIn: "1d" });

        res.json({
            msg: "LOGGED IN", token
        })
    } catch (error) {
        console.error(error)
    }
});

module.exports = router
