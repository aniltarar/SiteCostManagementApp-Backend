const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  const token =
    req.cookies.accessToken || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) {
    return res.status(401).json({ message: "Access token bulunamadı." });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Geçersiz access token." });
  }
};

const verifyRefreshToken = (req, res, next) => {
  const token =
    req.cookies.refreshToken  || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) {
    return res.status(401).json({ message: "Refresh token bulunamadı." });
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Geçersiz refresh token." });
  }
};

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
};