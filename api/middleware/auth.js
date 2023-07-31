const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authorize = req.headers.authorization;
  if (!authorize) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authorize.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
