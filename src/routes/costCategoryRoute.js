const express = require("express");
const router = express.Router();
const {
  createCostCategory,
} = require("../controller/costCategoryController.js");
const { verifyAccessToken } = require("../middlewares/authMiddleware.js");
const { checkRole } = require("../middlewares/checkRole.js");

router.post(
  "/",
  verifyAccessToken,
  checkRole("admin"),
  createCostCategory
);

module.exports = router;
