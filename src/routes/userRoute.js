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

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Kullanıcı yönetimi
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Tüm kullanıcıları listeler
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcılar başarıyla alındı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kullanıcılar başarıyla alındı.
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Belirli bir kullanıcıyı getirir
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Kullanıcının ID'si
 *         example: 64d4e7f2b2c1a2b3c4d5e6f8
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla alındı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kullanıcı başarıyla alındı.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Geçersiz kullanıcı ID'si
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /user/{userId}:
 *   put:
 *     summary: Kullanıcının rolünü günceller
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Güncellenecek kullanıcının ID'si
 *         example: 64d4e7f2b2c1a2b3c4d5e6f8
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: admin
 *                 description: Yeni kullanıcı rolü
 *     responses:
 *       200:
 *         description: Kullanıcı rolü başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kullanıcı rolü başarıyla güncellendi.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Geçersiz kullanıcı ID'si veya eksik alanlar
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /user/{userId}:
 *   delete:
 *     summary: Belirli bir kullanıcıyı siler
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Silinecek kullanıcının ID'si
 *         example: 64d4e7f2b2c1a2b3c4d5e6f8
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kullanıcı başarıyla silindi.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Geçersiz kullanıcı ID'si
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64d4e7f2b2c1a2b3c4d5e6f8
 *         firstName:
 *           type: string
 *           example: Ali
 *         lastName:
 *           type: string
 *           example: Veli
 *         email:
 *           type: string
 *           format: email
 *           example: ali@veli.com
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: admin
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-01-01T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-01-01T12:00:00.000Z
 */

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