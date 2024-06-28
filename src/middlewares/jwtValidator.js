require("dotenv").config();
const jwt = require('jsonwebtoken');

const jwtValidator = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = jwtValidator;

/*
const validateJwt = async (req, res, next) => {
  try {
    const jwtValidate = jwt.verify(req.headers.jwt, process.env.PRIVATE_KEY);
    if (jwtValidate) {
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
*/
