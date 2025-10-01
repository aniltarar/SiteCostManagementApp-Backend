const { body, param } = require("express-validator");

const createRule = (fieldName, isOptional = false) => {
  const rules = {
    name: (optional) => {
      let chain = body("name").trim();
      if (!optional) chain = chain.notEmpty().withMessage("Şantiye adı boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isLength({ min: 2, max: 50 })
        .withMessage("Şantiye adı en az 2 karakter - en fazla 50 karakter olmalıdır.");
    },

    location: (optional) => {
      let chain = body("location").trim();
      if (!optional) chain = chain.notEmpty().withMessage("Şantiye konumu boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isLength({ min: 2, max: 100 })
        .withMessage("Şantiye konumu en az 2 karakter - en fazla 100 karakter olmalıdır.");
    },

    budget: (optional) => {
      let chain = body("budget");
      if (!optional) chain = chain.notEmpty().withMessage("Bütçe alanı boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isFloat({ gt: 0 }).withMessage("Bütçe pozitif bir sayı olmalıdır.");
    },

    startDate: (optional) => {
      let chain = body("startDate");
      if (!optional) chain = chain.notEmpty().withMessage("Başlangıç tarihi boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isISO8601()
        .withMessage("Geçerli bir başlangıç tarihi giriniz (YYYY-MM-DD formatında).");
    },

    endDate: (optional) => {
      let chain = body("endDate");
      if (!optional) chain = chain.notEmpty().withMessage("Bitiş tarihi boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isISO8601()
        .withMessage("Geçerli bir bitiş tarihi giriniz (YYYY-MM-DD formatında).")
        .custom((value, { req }) => {
          if (req.body.startDate && new Date(value) <= new Date(req.body.startDate)) {
            throw new Error("Bitiş tarihi, başlangıç tarihinden sonra olmalıdır.");
          }
          return true;
        });
    },

    assignedUsers: (optional) => {
      return body("assignedUsers")
        .optional()
        .isArray()
        .withMessage("Atanan kullanıcılar alanı bir dizi olmalıdır.");
    },

    assignedUsersIds: (optional) => {
      return body("assignedUsers.*")
        .optional()
        .isMongoId()
        .withMessage("Atanan kullanıcı ID'leri geçerli bir ObjectId olmalıdır.");
    },
  };

  return rules[fieldName] ? rules[fieldName](isOptional) : null;
};

const siteValidationRules = {
  // Static rules
  siteId: param("siteId").isMongoId().withMessage("Geçerli bir şantiye ID'si giriniz."),

  // Required rules
  name: createRule("name", false),
  location: createRule("location", false),
  budget: createRule("budget", false),
  startDate: createRule("startDate", false),
  endDate: createRule("endDate", false),
  assignedUsers: createRule("assignedUsers", false),
  assignedUsersIds: createRule("assignedUsersIds", false),

  // Optional rules
  nameOptional: createRule("name", true),
  locationOptional: createRule("location", true),
  budgetOptional: createRule("budget", true),
  startDateOptional: createRule("startDate", true),
  endDateOptional: createRule("endDate", true),
  assignedUsersOptional: createRule("assignedUsers", true),
  assignedUsersIdsOptional: createRule("assignedUsersIds", true),
};

module.exports = siteValidationRules;