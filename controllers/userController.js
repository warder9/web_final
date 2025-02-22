const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  
const User = require('../models/User');  

exports.registerUser = async (req, res) => {  
    try {  
        const { username, email, password } = req.body;  
        const salt = await bcrypt.genSalt(10);  
        const hashedPassword = await bcrypt.hash(password, salt);  
        const newUser = new User({ username, email, password: hashedPassword });  
        await newUser.save();  
        res.status(201).json({ message: 'User registered successfully' });  
    } catch (error) {  
        res.status(500).json({ error: 'Server error' });  
    }  
};  

exports.loginUser = async (req, res) => {  
    try {  
        const { email, password } = req.body;  
        const user = await User.findOne({ email });  
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });  
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });  
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });  
        res.json({ token, user });  
    } catch (error) {  
        res.status(500).json({ error: 'Server error' });  
    }  
};  

