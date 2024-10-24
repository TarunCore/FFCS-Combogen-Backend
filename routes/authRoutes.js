const bcryptjs = require("bcryptjs")
const express = require("express");
const jwt = require("jsonwebtoken");

const { User } = require("../db");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { userName, userEmail, password } = req.body;
    const user = await User.findOne({ userEmail });
    if (user) {
        res.status(409).send({ msg: "User aldready exists" });
    } else {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({
            userName: userName,
            userEmail: userEmail,
            password: hashedPassword,
            savedCourseData: [[], [], [], [], [], [], [], [], [], []],
            favourites: []
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        res.json({ message: 'User created successfully', token });
    }
})

router.post("/login", async (req, res) => {
    const { userEmail, password } = req.body;
    const user = await User.findOne({ userEmail });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    try {
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: "Error logging in" });
    }

})

module.exports = router;