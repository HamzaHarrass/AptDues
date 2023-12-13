const User = require('../models/Users'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            'AZERTYUIO123456789', 
            { expiresIn: "3d" } 
        );

        res.cookie("token", token,{
            httpOnly : true,
        })
            
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {  Login };