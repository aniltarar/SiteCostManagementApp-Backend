const { body } = require("express-validator");

const userValidationRules = {
  email: body("email")
    .trim()
    .isEmail()
    .withMessage("Geçerli bir email adresi giriniz.")
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email alanı boş bırakılamaz.")
    .toLowerCase(),

  password: body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Şifre en az 6 karakter - en fazla 20 karakterolmalıdır.")
    .notEmpty()
    .withMessage("Şifre alanı boş bırakılamaz.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    )
    .withMessage(
      "Parola en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
    ),

    firstName: body("firstName")
    .trim()
    .notEmpty()
    .withMessage("İsim alanı boş bırakılamaz.")
    .isLength({ min: 2, max: 30 })
    .withMessage("İsim en az 2 karakter - en fazla 30 karakter olmalıdır.")
    .matches(/^[A-Za-zğüşöçıİĞÜŞÖÇ\s]+$/)
    .withMessage("İsim sadece harf ve boşluk içerebilir."),

    lastName: body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Soyisim alanı boş bırakılamaz.")
    .isLength({ min: 2, max: 30 })
    .withMessage("Soyisim en az 2 karakter - en fazla 30 karakter olmalıdır.")
    .matches(/^[A-Za-zğüşöçıİĞÜŞÖÇ\s]+$/)
    .withMessage("Soyisim sadece harf ve boşluk içerebilir."),

};

module.exports = userValidationRules;