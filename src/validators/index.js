const validate = require("../middlewares/validateMiddleware.js");
const userValidator = require("./userValidator.js");
const siteValidator = require("./siteValidator.js");
const costValidationRules = require("./costValidator.js");
const costCategoryValidationRules = require("./costCategoryValidator.js");

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

// ** Cost Category VALIDATION RULES **
const validateCostCategoryCreation = [
  costCategoryValidationRules.name,
  costCategoryValidationRules.description,
  costCategoryValidationRules.isGlobal,
  costCategoryValidationRules.siteId,
  validate,
];

const validateGetCostCategoriesBySiteId = [
  costCategoryValidationRules.siteIdParam,
  validate,
];

const validateDeleteCostCategory = [
  costCategoryValidationRules.categoryId,
  validate,
];

const validateUpdateCostCategory = [
  costCategoryValidationRules.categoryId,
  costCategoryValidationRules.nameOptional,
  costCategoryValidationRules.descriptionOptional,
  costCategoryValidationRules.isGlobalOptional,
  costCategoryValidationRules.siteIdOptional,
  costCategoryValidationRules.notEmptyBody,
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
  // Cost Category
  validateCostCategoryCreation,
  validateGetCostCategoriesBySiteId,
  validateDeleteCostCategory,
  validateUpdateCostCategory,
  
};
