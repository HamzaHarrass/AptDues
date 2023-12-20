// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

async function isAuthenticated(req, res, next) {
  const accessToken = req.cookies["access_token"];
console.log(accessToken);
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized: Missing access token" });
  }

  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET || 'default_secret');
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid access token" });
  }
}

module.exports = {
  isAuthenticated,
};
