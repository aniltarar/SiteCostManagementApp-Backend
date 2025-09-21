const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  tokenRefresh,
} = require("../controller/authController.js");
const {
  validateRegistration,
  validateLogin,
} = require("../validators/index.js");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Kimlik doğrulama işlemleri
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı oluşturur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Ahmet
 *               lastName:
 *                 type: string
 *                 example: Yılmaz
 *               email:
 *                 type: string
 *                 example: ahmet@example.com
 *               password:
 *                 type: string
 *                 example: sifre123
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu
 *       400:
 *         description: Eksik veya hatalı bilgi
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Kullanıcı girişi yapar
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: ahmet@example.com
 *               password:
 *                 type: string
 *                 example: sifre123
 *     responses:
 *       200:
 *         description: Giriş başarılı
 *       400:
 *         description: Eksik bilgi
 *       401:
 *         description: Şifre yanlış
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Kullanıcı çıkışı yapar
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: <refresh_token>
 *     responses:
 *       200:
 *         description: Başarıyla çıkış yapıldı
 *       400:
 *         description: Refresh token eksik veya bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /auth/token-refresh:
 *   post:
 *     summary: Access ve refresh token yeniler
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: <refresh_token>
 *     responses:
 *       200:
 *         description: Tokenlar başarıyla yenilendi
 *       401:
 *         description: Refresh token bulunamadı veya geçersiz
 *       500:
 *         description: Sunucu hatası
 */

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.post("/token-refresh", tokenRefresh);

module.exports = router;
