const express = require("express");
const router = express.Router();

const {
  createCost,
  getCostsBySiteId,
  updateCostById,
  deleteCostById,
} = require("../controller/costController.js");
const { verifyAccessToken } = require("../middlewares/authMiddleware.js");
const { checkRole } = require("../middlewares/checkRole.js");
const {
  validateCostCreation,
  validateGetCostBySiteId,
  validateDeleteCostById,
  validateUpdateCostById,
} = require("../validators/index.js");
const upload = require("../config/multerConfig.js");

/**
 * @swagger
 * tags:
 *   name: Cost
 *   description: Gider yönetimi
 */

/**
 * @swagger
 * /cost:
 *   post:
 *     summary: Yeni bir gider oluşturur
 *     tags: [Cost]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - unit
 *               - quantity
 *               - unitPrice
 *               - moneyType
 *               - costCategory
 *               - siteId
 *             properties:
 *               title:
 *                 type: string
 *                 example: C25 Beton Dökümü
 *               description:
 *                 type: string
 *                 example: Temel ve perde duvarlar için beton dökümü
 *               unit:
 *                 type: string
 *                 example: m3
 *               quantity:
 *                 type: number
 *                 example: 12.5
 *               unitPrice:
 *                 type: number
 *                 example: 1500
 *               taxRate:
 *                 type: number
 *                 example: 20
 *               moneyType:
 *                 type: string
 *                 example: TRY
 *               costCategory:
 *                 type: string
 *                 example: 68c1f417cc6b6b534764747d
 *               siteId:
 *                 type: string
 *                 example: 6898ec00ca777605c79a7106
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Fatura veya belge dosyası (JPEG, PNG, JPG, PDF - Max 15MB)
 *     responses:
 *       201:
 *         description: Gider başarıyla oluşturuldu
 *       400:
 *         description: Dosya hatası veya eksik alanlar
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       404:
 *         description: Şantiye veya kategori bulunamadı
 *       500:
 *         description: Sunucu hatası
 */


/**
 * @swagger
 * /cost/{siteId}:
 *   get:
 *     summary: Belirli bir şantiyeye ait giderleri listeler
 *     tags: [Cost]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: siteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Şantiyenin ID'si
 *         example: 6898ec00ca777605c79a7106
 *     responses:
 *       200:
 *         description: Giderler başarıyla alındı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Giderler başarıyla alındı.
 *                 costs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Cost'
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
 * /cost/{costId}:
 *   put:
 *     summary: Bir gideri günceller
 *     tags: [Cost]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: costId
 *         required: true
 *         schema:
 *           type: string
 *         description: Güncellenecek gider ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: C25 Beton Dökümü (Güncellendi)
 *               description:
 *                 type: string
 *                 example: Güncellenmiş açıklama
 *               unit:
 *                 type: string
 *                 example: m3
 *               quantity:
 *                 type: number
 *                 example: 15
 *               unitPrice:
 *                 type: number
 *                 example: 1600
 *               taxRate:
 *                 type: number
 *                 example: 20
 *               moneyType:
 *                 type: string
 *                 example: TRY
 *               costCategory:
 *                 type: string
 *                 example: 68c1f417cc6b6b534764747d
 *               siteId:
 *                 type: string
 *                 example: 6898ec00ca777605c79a7106
 *               fileUrl:
 *                 type: string
 *                 example: https://example.com/uploads/beton-faturasi-v2.pdf
 *     responses:
 *       200:
 *         description: Gider başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gider başarıyla güncellendi.
 *                 cost:
 *                   $ref: '#/components/schemas/Cost'
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       404:
 *         description: Gider bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /cost/{costId}:
 *   delete:
 *     summary: Bir gideri siler
 *     tags: [Cost]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: costId
 *         required: true
 *         schema:
 *           type: string
 *         description: Silinecek gider ID'si
 *     responses:
 *       200:
 *         description: Gider başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gider başarıyla silindi.
 *                 cost:
 *                   $ref: '#/components/schemas/Cost'
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       404:
 *         description: Gider bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cost:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 68d0f9c12a15e3364966d86c
 *         title:
 *           type: string
 *           example: C25 Beton Dökümü
 *         description:
 *           type: string
 *           example: Temel ve perde duvarlar için beton dökümü
 *         unit:
 *           type: string
 *           example: m3
 *         quantity:
 *           type: number
 *           example: 12.5
 *         unitPrice:
 *           type: number
 *           example: 1500
 *         taxRate:
 *           type: number
 *           example: 20
 *         moneyType:
 *           type: string
 *           example: TRY
 *         costCategory:
 *           type: string
 *           example: 68c1f417cc6b6b534764747d
 *         siteId:
 *           type: string
 *           example: 6898ec00ca777605c79a7106
 *         createdBy:
 *           type: string
 *           example: 64d4e7f2b2c1a2b3c4d5e6f8
 *         fileUrl:
 *           type: string
 *           example: https://example.com/uploads/beton-faturasi.pdf
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

router.post(
  "/",
  verifyAccessToken,
  checkRole("admin"),
  upload.single("file"),
  validateCostCreation,
  createCost
);
router.get(
  "/:siteId",
  verifyAccessToken,
  checkRole("admin"),
  validateGetCostBySiteId,
  getCostsBySiteId
);
router.put(
  "/:costId",
  verifyAccessToken,
  checkRole("admin"),
  validateUpdateCostById,
  updateCostById
);
router.delete(
  "/:costId",
  verifyAccessToken,
  checkRole("admin"),
  validateDeleteCostById,
  deleteCostById
);

module.exports = router;
