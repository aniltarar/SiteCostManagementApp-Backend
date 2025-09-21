const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  // eğer errors boş değilse, bloğa gir
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "Error",
      message: "Validation Error",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }
  next();
};

module.exports = validate;