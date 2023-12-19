const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; 

  if (token) {
    try {
      const decoded = jwt.verify(token, 'AZERTYUIO123456789'); 
      const user = await User.findOne({ _id: decoded.userId });

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = user; 
      next(); 
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' }); 
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
