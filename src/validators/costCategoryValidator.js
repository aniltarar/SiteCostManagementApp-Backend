const { body, param } = require("express-validator");

const createRule = (fieldName, isOptional = false) => {
  const rules = {
    name: (optional) => {
      let chain = body("name").trim();
      if (!optional) chain = chain.notEmpty().withMessage("Kategori adı boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isLength({ min: 2, max: 50 })
        .withMessage("Kategori adı en az 2 karakter - en fazla 50 karakter olmalıdır.");
    },

    description: (optional) => {
      let chain = body("description").trim();
      if (optional) chain = chain.optional();
      return chain.isLength({ max: 300 })
        .withMessage("Kategori açıklaması en fazla 300 karakter olmalıdır.");
    },

    isGlobal: (optional) => {
      let chain = body("isGlobal");
      if (optional) chain = chain.optional();
      return chain.isBoolean()
        .withMessage("isGlobal alanı true veya false değeri olmalıdır.")
        .toBoolean();
    },

    siteId: (optional) => {
      let chain = body("siteId");
      if (!optional) chain = chain.notEmpty().withMessage("Şantiye ID'si boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isMongoId().withMessage("Geçerli bir şantiye ID'si giriniz.");
    },
  };

  return rules[fieldName] ? rules[fieldName](isOptional) : null;
};

const costCategoryValidationRules = {
  // Static rules
  categoryId: param("id").isMongoId().withMessage("Geçerli bir kategori ID'si giriniz."),
  siteIdParam: param("siteId").isMongoId().withMessage("Geçerli bir şantiye ID'si giriniz."),

    notEmptyBody: body().custom((value, { req }) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Güncellenecek en az bir alan gönderilmelidir.");
    }
    return true;
  }),

  // Required rules
  name: createRule("name", false),
  description: createRule("description", false),
  isGlobal: createRule("isGlobal", false),
  siteId: createRule("siteId", false),

  // Optional rules
  nameOptional: createRule("name", true),
  descriptionOptional: createRule("description", true),
  isGlobalOptional: createRule("isGlobal", true),
  siteIdOptional: createRule("siteId", true),
};

module.exports = costCategoryValidationRules;