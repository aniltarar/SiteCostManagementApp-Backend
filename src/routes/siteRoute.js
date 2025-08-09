const express = require("express");
const router = express.Router();
const { createSite } = require("../controller/siteController.js");
const {verifyAccessToken} = require("../middlewares/authMiddleware.js")
const {checkRole} = require("../middlewares/checkRole.js");
/**
 * @swagger
 * tags:
 *   name: Site
 *   description: Şantiye işlemleri
 */

/**
 * @swagger
 * /site/create:
 *   post:
 *     summary: Yeni site (şantiye) oluşturur
 *     tags: [Site]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - budget
 *               - startDate
 *               - endDate
 *             properties:
 *               name:
 *                 type: string
 *                 example: Merkez Şantiye
 *               location:
 *                 type: string
 *                 example: İstanbul
 *               budget:
 *                 type: number
 *                 example: 1000000
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-01
 *     responses:
 *       201:
 *         description: Site başarıyla oluşturuldu
 *       400:
 *         description: Tüm alanlar gereklidir
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

router.post("/create", verifyAccessToken, checkRole("admin"), createSite);

module.exports = router;