const express= require('express');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const User= require('../models/User');

const router= express.Router();                                        //to register new user
router.post('/register', async(req, res) => {
    const { username, password}=req.body;
    const hashedPassword=await bcrypt.hash(password, 10);
    const User= new User({username, password: hashedPassword });
    await username.save();
    res.status(201).send('User registered');
});

router.post('/login', async (req, res) => {                            //to check whether the login details are valid
    const { username, password } = req.body;
    const user= await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token= jwt.sign({ userId: user._id }, 'secret_key');
        res.json({ token });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

module.exports= router;