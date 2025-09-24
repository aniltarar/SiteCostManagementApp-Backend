const validate = require("../middlewares/validateMiddleware.js");
const userValidator = require("./userValidator.js");
const siteValidator = require("./siteValidator.js");

// **AUTH VALIDATION RULES**
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

// **SITE VALIDATION RULES**

const validateSiteCreation = [
  siteValidator.name,
  siteValidator.location,
  siteValidator.budget,
  siteValidator.startDate,
  siteValidator.endDate,
  siteValidator.assignedUsers,
  validate,
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateSiteCreation,
};
