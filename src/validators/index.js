const validate = require("../middlewares/validateMiddleware.js");
const userValidator = require("./userValidator.js");

// Register Validasyon Kuralları
const validateRegistration = [
  userValidator.firstName,
  userValidator.lastName,
  userValidator.email,
  userValidator.password,
  validate,
];

// Login Validasyon Kuralları
const validateLogin = [userValidator.email, userValidator.password, validate];

module.exports = {
  validateRegistration,
  validateLogin,
};
