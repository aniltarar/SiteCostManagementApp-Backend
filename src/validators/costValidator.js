const { body, param } = require("express-validator");

const costValidationRules = {
  costId: param("costId")
    .isMongoId()
    .withMessage("Geçerli bir maliyet/gider ID'si giriniz."),
  title: body("title")
    .trim()
    .notEmpty()
    .withMessage("Maliyet başlığı boş bırakılamaz.")
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "Maliyet başlığı en az 2 karakter - en fazla 100 karakter olmalıdır."
    ),
  description: body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Maliyet açıklaması en fazla 500 karakter olmalıdır."),
  unit: body("unit")
    .trim()
    .notEmpty()
    .withMessage("Birim boş bırakılamaz.")
    .isIn(["adet", "kg", "litre", "metre", "santim", "koli", "paket", "diger"])
    .withMessage(
      "Birim sadece şu değerlerden biri olabilir: adet, kg, litre, metre, santim, koli, paket, diger"
    ),
  quantity: body("quantity")
    .notEmpty()
    .withMessage("Miktar boş bırakılamaz.")
    .isFloat({ gt: 0 })
    .withMessage("Miktar 0'dan büyük bir sayı olmalıdır."),
  unitPrice: body("unitPrice")
    .notEmpty()
    .withMessage("Birim fiyat boş bırakılamaz.")
    .isFloat({ gt: 0 })
    .withMessage("Birim fiyat 0'dan büyük bir sayı olmalıdır."),
  taxRate: body("taxRate")
    .notEmpty()
    .withMessage("Vergi oranı boş bırakılamaz.")
    .isFloat({ min: 0 })
    .withMessage("Vergi oranı 0 veya daha büyük bir sayı olmalıdır."),
  moneyType: body("moneyType")
    .trim()
    .notEmpty()
    .withMessage("Para birimi boş bırakılamaz.")
    .isIn([
      "TRY",
      "USD",
      "EUR",
      "GBP",
      "JPY",
      "CNY",
      "AUD",
      "CAD",
      "CHF",
      "SEK",
      "NOK",
      "DKK",
    ])
    .withMessage(
      "Para birimi geçerli bir değer olmalıdır. (TRY, USD, EUR, GBP, JPY, CNY, AUD, CAD, CHF, SEK, NOK, DKK)"
    ),
  costCategory: body("costCategory")
    .isMongoId()
    .withMessage("Geçerli bir maliyet kategorisi ID'si giriniz.")
    .notEmpty()
    .withMessage("Maliyet kategorisi boş bırakılamaz."),
  siteId: body("siteId")
    .notEmpty()
    .withMessage("Şantiye ID'si boş bırakılamaz.")
    .isMongoId()
    .withMessage("Geçerli bir şantiye ID'si giriniz."),
    siteIdParam: param("siteId")
    .isMongoId()
    .withMessage("Geçerli bir şantiye ID'si giriniz."),
  // fileUrl opsiyonel, URL formatında olabilir
  fileUrl: body("fileUrl")
    .optional()
    .isURL()
    .withMessage("Geçerli dosya URL'si giriniz."),
    // Update için opsiyonel kurallar
    titleOptional: body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Maliyet başlığı boş bırakılamaz.")
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "Maliyet başlığı en az 2 karakter - en fazla 100 karakter olmalıdır."
    ),
    descriptionOptional: body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Maliyet açıklaması en fazla 500 karakter olmalıdır."),
  unitOptional: body("unit")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Birim boş bırakılamaz.")
    .isIn(["adet", "kg", "litre", "metre", "santim", "koli", "paket", "diger"])
    .withMessage(
      "Birim sadece şu değerlerden biri olabilir: adet, kg, litre, metre, santim, koli, paket, diger"
    ),
  quantityOptional: body("quantity")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Miktar 0'dan büyük bir sayı olmalıdır."),
    unitPriceOptional: body("unitPrice")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Birim fiyat 0'dan büyük bir sayı olmalıdır."),
    taxRateOptional: body("taxRate")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Vergi oranı 0 veya daha büyük bir sayı olmalıdır."),
    moneyTypeOptional: body("moneyType")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Para birimi boş bırakılamaz.")
    .isIn([
      "TRY",
      "USD",
      "EUR",
      "GBP",
      "JPY",
      "CNY",
      "AUD",
      "CAD",
      "CHF",
      "SEK",
      "NOK",
      "DKK",
    ])
    .withMessage(
      "Para birimi geçerli bir değer olmalıdır. (TRY, USD, EUR, GBP, JPY, CNY, AUD, CAD, CHF, SEK, NOK, DKK)"
    ),
    costCategoryOptional: body("costCategory")
    .optional()
    .isMongoId()
    .withMessage("Geçerli bir maliyet kategorisi ID'si giriniz."),
    siteIdOptional: body("siteId")
    .optional()
    .notEmpty()
    .withMessage("Şantiye ID'si boş bırakılamaz.")
    .isMongoId()
    .withMessage("Geçerli bir şantiye ID'si giriniz."),
};

module.exports = costValidationRules;
