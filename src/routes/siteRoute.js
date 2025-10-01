const express = require("express");
const router = express.Router();
const {
  createSite,
  getAllSites,
  deleteSiteById,
  getSiteById,
  updateSiteById,
} = require("../controller/siteController.js");
const { verifyAccessToken } = require("../middlewares/authMiddleware.js");
const { checkRole } = require("../middlewares/checkRole.js");
const {
  validateSiteCreation,
  validateGetSiteById,
  validateDeleteSiteById,
  validateUpdateSiteById,
} = require("../validators/index.js");

/**
 * @swagger
 * tags:
 *   name: Site
 *   description: Şantiye yönetimi
 */

/**
 * @swagger
 * /site:
 *   post:
 *     summary: Yeni bir şantiye oluşturur
 *     tags: [Site]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *                 example: 2025-08-01T00:00:00.000Z
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-01T00:00:00.000Z
 *               assignedUsers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64d4e7f2b2c1a2b3c4d5e6f8"]
 *     responses:
 *       201:
 *         description: Site başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Site başarıyla oluşturuldu.
 *                 site:
 *                   $ref: '#/components/schemas/Site'
 *       400:
 *         description: Eksik veya hatalı alanlar
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /site:
 *   get:
 *     summary: Tüm şantiyeleri listeler
 *     tags: [Site]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Şantiyeler başarıyla alındı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Şantiyeler başarıyla alındı.
 *                 sites:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Site'
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /site/{siteId}:
 *   get:
 *     summary: Belirli bir şantiyeyi getirir
 *     tags: [Site]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: siteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Şantiyenin ID'si
 *         example: 6898f9f12a15e3364966d86c
 *     responses:
 *       200:
 *         description: Şantiye başarıyla alındı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Şantiye başarıyla alındı.
 *                 site:
 *                   $ref: '#/components/schemas/Site'
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       404:
 *         description: Şantiye bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /site/{siteId}:
 *   delete:
 *     summary: Belirli bir şantiyeyi siler
 *     tags: [Site]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: siteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Silinecek şantiyenin ID'si
 *         example: 6898f9f12a15e3364966d86c
 *     responses:
 *       200:
 *         description: Şantiye başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Şantiye başarıyla silindi.
 *                 site:
 *                   $ref: '#/components/schemas/Site'
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       404:
 *         description: Şantiye bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Site:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6898f9f12a15e3364966d86c
 *         name:
 *           type: string
 *           example: Merkez Şantiye
 *         location:
 *           type: string
 *           example: İstanbul
 *         budget:
 *           type: number
 *           example: 1000000
 *         startDate:
 *           type: string
 *           format: date
 *           example: 2025-08-01T00:00:00.000Z
 *         endDate:
 *           type: string
 *           format: date
 *           example: 2026-08-01T00:00:00.000Z
 *         createdBy:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 64d4e7f2b2c1a2b3c4d5e6f8
 *             firstName:
 *               type: string
 *               example: Ali
 *             lastName:
 *               type: string
 *               example: Veli
 *             email:
 *               type: string
 *               example: ali@veli.com
 *         assignedUsers:
 *           type: array
 *           items:
 *             type: string
 *           example: ["64d4e7f2b2c1a2b3c4d5e6f8"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

router.get("/", verifyAccessToken, checkRole("admin"), getAllSites);
router.post(
  "/",
  verifyAccessToken,
  checkRole("admin"),
  validateSiteCreation,
  createSite
);
router.get(
  "/:siteId",
  verifyAccessToken,
  checkRole("admin"),
  validateGetSiteById,
  getSiteById
);
router.delete(
  "/:siteId",
  verifyAccessToken,
  checkRole("admin"),
  validateDeleteSiteById,
  deleteSiteById
);
router.put(
  "/:siteId",
  verifyAccessToken,
  checkRole("admin"),
  validateUpdateSiteById,
  updateSiteById
);
module.exports = router;
