const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


//Register User
exports.registerUser = async (req, res) =>{
    
    try {
        const { email, password, role, tenant } = req.body;

        let user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "User already exist"});

        const hashedPassword = await bcrypt.hash(password, 10)

        user = new User({email, password: hashedPassword, role, tenant})

        await user.save();

        res.status(201).json({message: 'User registered successfully', user})

    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
};

exports.loginUser = async () =>{
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(401).send({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).send({message: "Invalid credentials"})

        const token = jwt.sign(
            {userId: user._id, role:user.role, tenant:user.tenant},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.status(201).json({message: 'Login successful', token})
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
};