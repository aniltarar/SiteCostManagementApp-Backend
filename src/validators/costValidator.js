const { body, param } = require("express-validator");

const createRule = (fieldName, isOptional = false) => {
  const rules = {
    title: (optional) => {
      let chain = body("title").trim();
      if (!optional) chain = chain.notEmpty().withMessage("Maliyet başlığı boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isLength({ min: 2, max: 100 })
        .withMessage("Maliyet başlığı en az 2 karakter - en fazla 100 karakter olmalıdır.");
    },

    description: (optional) => {
      let chain = body("description").trim();
      if (optional) chain = chain.optional();
      return chain.isLength({ max: 500 })
        .withMessage("Maliyet açıklaması en fazla 500 karakter olmalıdır.");
    },

    unit: (optional) => {
      let chain = body("unit").trim();
      if (!optional) chain = chain.notEmpty().withMessage("Birim boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isIn(["adet", "kg", "litre", "metre", "santim", "koli", "paket", "diger"])
        .withMessage("Birim sadece şu değerlerden biri olabilir: adet, kg, litre, metre, santim, koli, paket, diger");
    },

    quantity: (optional) => {
      let chain = body("quantity");
      if (!optional) chain = chain.notEmpty().withMessage("Miktar boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isFloat({ gt: 0 }).withMessage("Miktar 0'dan büyük bir sayı olmalıdır.");
    },

    unitPrice: (optional) => {
      let chain = body("unitPrice");
      if (!optional) chain = chain.notEmpty().withMessage("Birim fiyat boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isFloat({ gt: 0 }).withMessage("Birim fiyat 0'dan büyük bir sayı olmalıdır.");
    },

    taxRate: (optional) => {
      let chain = body("taxRate");
      if (!optional) chain = chain.notEmpty().withMessage("Vergi oranı boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isFloat({ min: 0 }).withMessage("Vergi oranı 0 veya daha büyük bir sayı olmalıdır.");
    },

    moneyType: (optional) => {
      let chain = body("moneyType").trim();
      if (!optional) chain = chain.notEmpty().withMessage("Para birimi boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isIn(["TRY", "USD", "EUR", "GBP", "JPY", "CNY", "AUD", "CAD", "CHF", "SEK", "NOK", "DKK"])
        .withMessage("Para birimi geçerli bir değer olmalıdır.");
    },

    costCategory: (optional) => {
      let chain = body("costCategory");
      if (!optional) chain = chain.notEmpty().withMessage("Maliyet kategorisi boş bırakılamaz.");
      else chain = chain.optional();
      return chain.isMongoId().withMessage("Geçerli bir maliyet kategorisi ID'si giriniz.");
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

const costValidationRules = {
  // Static rules
  costId: param("costId").isMongoId().withMessage("Geçerli bir maliyet/gider ID'si giriniz."),
  siteIdParam: param("siteId").isMongoId().withMessage("Geçerli bir şantiye ID'si giriniz."),
  fileUrl: body("fileUrl").optional().isURL().withMessage("Geçerli dosya URL'si giriniz."),

  // Required rules
  title: createRule("title", false),
  description: createRule("description", false),
  unit: createRule("unit", false),
  quantity: createRule("quantity", false),
  unitPrice: createRule("unitPrice", false),
  taxRate: createRule("taxRate", false),
  moneyType: createRule("moneyType", false),
  costCategory: createRule("costCategory", false),
  siteId: createRule("siteId", false),

  // Optional rules
  titleOptional: createRule("title", true),
  descriptionOptional: createRule("description", true),
  unitOptional: createRule("unit", true),
  quantityOptional: createRule("quantity", true),
  unitPriceOptional: createRule("unitPrice", true),
  taxRateOptional: createRule("taxRate", true),
  moneyTypeOptional: createRule("moneyType", true),
  costCategoryOptional: createRule("costCategory", true),
  siteIdOptional: createRule("siteId", true),
};

module.exports = costValidationRules;