const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    const jwtPayload = jsonwebtoken.verify(accessToken, process.env.jwt_salt);

    req.patient = jwtPayload;
  } catch (error) {
    res.status(401).json({ error: "Unauthorized Attempt." });
    return;
  }
  next();
};

module.exports = auth;
