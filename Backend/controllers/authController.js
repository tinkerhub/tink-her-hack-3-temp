const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {                                       //to register new user
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

exports.login = async (req, res) => {                                          //Authenticate access
    const { username, password } = req.body;
    try {
        const user= await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {       // //to check whether the login details are valid
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token= jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
};