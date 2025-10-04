const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUserRole,
  getUserById,
  deleteUserById,
} = require("../controller/userController.js");
const { checkRole } = require("../middlewares/checkRole.js");
const { verifyAccessToken } = require("../middlewares/authMiddleware.js");

router.get("/", verifyAccessToken, checkRole("admin"), getAllUsers);
router.get("/:userId", verifyAccessToken, checkRole("admin"), getUserById);
router.put("/:userId", verifyAccessToken, checkRole("admin"), updateUserRole);
router.delete(
  "/:userId",
  verifyAccessToken,
  checkRole("admin"),
  deleteUserById
);
module.exports = router;
