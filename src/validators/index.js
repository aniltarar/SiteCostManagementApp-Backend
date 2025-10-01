const validate = require("../middlewares/validateMiddleware.js");
const userValidator = require("./userValidator.js");
const siteValidator = require("./siteValidator.js");
const costValidationRules = require("./costValidator.js");

// **AUTH VALIDATION RULES**
// Register Validasyon Kuralları
const validateRegistration = [
  userValidator.firstName,
  userValidator.lastName,
  userValidator.email,
  userValidator.password,
  validate,
];
const validateLogin = [userValidator.email, userValidator.password, validate];

// **SITE VALIDATION RULES**

const validateSiteCreation = [
  siteValidator.name,
  siteValidator.location,
  siteValidator.budget,
  siteValidator.startDate,
  siteValidator.endDate,
  siteValidator.assignedUsers,
  siteValidator.assignedUsersIds,
  validate,
];
const validateGetSiteById = [siteValidator.siteId, validate];
const validateDeleteSiteById = [siteValidator.siteId, validate];

const validateUpdateSiteById = [
  siteValidator.siteId,
  siteValidator.nameOptional,
  siteValidator.locationOptional,
  siteValidator.budgetOptional,
  siteValidator.startDateOptional,
  siteValidator.endDateOptional,
  siteValidator.assignedUsersOptional,
  siteValidator.assignedUsersIdsOptional,
  validate,
];

// **Cost VALIDATION RULES**
const validateCostCreation = [
  costValidationRules.title,
  costValidationRules.description,
  costValidationRules.unit,
  costValidationRules.quantity,
  costValidationRules.unitPrice,
  costValidationRules.taxRate,
  costValidationRules.moneyType,
  costValidationRules.costCategory,
  costValidationRules.siteId,
  costValidationRules.fileUrl,
  validate,
];

const validateGetCostBySiteId = [costValidationRules.siteIdParam, validate];
const validateDeleteCostById = [costValidationRules.costId, validate];

const validateUpdateCostById = [
  costValidationRules.costId,
  costValidationRules.titleOptional,
  costValidationRules.descriptionOptional,
  costValidationRules.unitOptional,
  costValidationRules.quantityOptional,
  costValidationRules.unitPriceOptional,
  costValidationRules.taxRateOptional,
  costValidationRules.moneyTypeOptional,
  costValidationRules.costCategoryOptional,
  costValidationRules.siteIdOptional,
  costValidationRules.fileUrl,
  validate,
];

module.exports = {
  // Auth
  validateRegistration,
  validateLogin,
  // Site
  validateSiteCreation,
  validateGetSiteById,
  validateDeleteSiteById,
  validateUpdateSiteById,
  // Cost
  validateCostCreation,
  validateGetCostBySiteId,
  validateDeleteCostById,
  validateUpdateCostById,
};
