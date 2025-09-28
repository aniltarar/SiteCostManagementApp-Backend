const { body,param } = require("express-validator");

const siteValidationRules = {
  name: body("name")
    .trim()
    .notEmpty()
    .withMessage("Şantiye adı boş bırakılamaz.")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "Şantiye adı en az 2 karakter - en fazla 50 karakter olmalıdır."
    ),

  location: body("location")
    .trim()
    .notEmpty()
    .withMessage("Şantiye konumu boş bırakılamaz.")
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "Şantiye konumu en az 2 karakter - en fazla 100 karakter olmalıdır."
    ),

  budget: body("budget")
    .notEmpty()
    .withMessage("Bütçe alanı boş bırakılamaz.")
    .isFloat({ gt: 0 })
    .withMessage("Bütçe pozitif bir sayı olmalıdır."),

  startDate: body("startDate")
    .notEmpty()
    .withMessage("Başlangıç tarihi boş bırakılamaz.")
    .isISO8601()
    .withMessage(
      "Geçerli bir başlangıç tarihi giriniz (YYYY-MM-DD formatında)."
    ),

  endDate: body("endDate")
    .notEmpty()
    .withMessage("Bitiş tarihi boş bırakılamaz.")
    .isISO8601()
    .withMessage("Geçerli bir bitiş tarihi giriniz (YYYY-MM-DD formatında).")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("Bitiş tarihi, başlangıç tarihinden sonra olmalıdır.");
      }
      return true;
    }),

  assignedUsers: body("assignedUsers")
    .optional()
    .isArray()
    .withMessage("Atanan kullanıcılar alanı bir dizi olmalıdır."),
    // assignedUsers.* yaparak dizinin her bir elemanını kontrol ediyoruz
  assignedUsersIds: body("assignedUsers.*")
    .optional()
    .isMongoId()
    .withMessage("Atanan kullanıcı ID'leri geçerli bir ObjectId olmalıdır."),

    siteId: param("siteId")
    .isMongoId()
    .withMessage("Geçerli bir şantiye ID'si giriniz.")
};

module.exports = siteValidationRules;
