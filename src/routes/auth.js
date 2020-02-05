const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../model/User')

//localhost:3000/api/
router.get("/", (req, res, next) => {
    
    res.send('HELLO KITTY!');

});

// TODO: Validate email and password

//localhost:3000/api/user/register
router.post("/user/register", async (req, res, next) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const saved = await user.save()
        res.send(saved);

    } catch (error) {
        res.status(400).send(error)
    }

});


//localhost:3000/api/user/login
router.post("/user/login", async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).json({error: true, message: "Email not found"})

    if (req.body.password !== user.password) return res.status(400).json({error: true, message: "Invalid Password"})

    // create JWT token

    const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token)

    res.status(200).json({error: null, message: 'Login successful'});

});


module.exports = router;
