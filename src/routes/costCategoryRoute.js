const express = require("express");
const router = express.Router();
const {
  createCostCategory,
  deleteCostCategory,
  updateCostCategory,
  getCostCategories,
  getCostCategoriesBySiteId,
} = require("../controller/costCategoryController.js");
const { verifyAccessToken } = require("../middlewares/authMiddleware.js");
const { checkRole } = require("../middlewares/checkRole.js");

/**
 * @swagger
 * tags:
 *   name: CostCategory
 *   description: Maliyet kategorisi yönetimi
 */

/**
 * @swagger
 * /cost-category:
 *   post:
 *     summary: Yeni bir maliyet kategorisi oluşturur
 *     tags: [CostCategory]
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
 *                 example: Beton
 *               description:
 *                 type: string
 *                 example: Duvar ve kalıplara döküm işlemi için
 *               isGlobal:
 *                 type: boolean
 *                 example: false
 *               siteId:
 *                 type: string
 *                 example: 68c1df3c93e7321cce38cb81
 *     responses:
 *       201:
 *         description: Cost category başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cost category başarıyla oluşturuldu.
 *                 costCategory:
 *                   $ref: '#/components/schemas/CostCategory'
 *       400:
 *         description: Eksik veya hatalı alanlar
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       404:
 *         description: Site bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /cost-category:
 *   get:
 *     summary: Tüm maliyet kategorilerini listeler
 *     tags: [CostCategory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cost categories başarıyla listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 costCategoriesCount:
 *                   type: integer
 *                   example: 3
 *                 message:
 *                   type: string
 *                   example: Cost categories başarıyla listelendi.
 *                 costCategories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CostCategory'
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /cost-category/{siteId}:
 *   get:
 *     summary: Belirli bir şantiyeye ait maliyet kategorilerini listeler
 *     tags: [CostCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: siteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Şantiyenin ID'si
 *         example: 68c1df3c93e7321cce38cb81
 *     responses:
 *       200:
 *         description: Cost categories başarıyla listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 costCategoriesCount:
 *                   type: integer
 *                   example: 2
 *                 message:
 *                   type: string
 *                   example: Cost categories başarıyla listelendi.
 *                 costCategories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CostCategory'
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       404:
 *         description: Bu şantiyeye ait hiç cost category bulunamadı.
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /cost-category/{id}:
 *   put:
 *     summary: Bir maliyet kategorisini günceller
 *     tags: [CostCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Güncellenecek cost category ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Beton
 *               description:
 *                 type: string
 *                 example: Güncellenmiş açıklama
 *               isGlobal:
 *                 type: boolean
 *                 example: false
 *               siteId:
 *                 type: string
 *                 example: 68c1df3c93e7321cce38cb81
 *     responses:
 *       200:
 *         description: Cost category başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cost category başarıyla güncellendi.
 *                 costCategory:
 *                   $ref: '#/components/schemas/CostCategory'
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       404:
 *         description: Cost category bulunamadı.
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /cost-category/{id}:
 *   delete:
 *     summary: Bir maliyet kategorisini siler
 *     tags: [CostCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Silinecek cost category ID'si
 *     responses:
 *       200:
 *         description: Cost category başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cost category başarıyla silindi.
 *                 costCategory:
 *                   $ref: '#/components/schemas/CostCategory'
 *       401:
 *         description: Kullanıcı doğrulanamadı
 *       404:
 *         description: Cost category bulunamadı.
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CostCategory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 68c1df3c93e7321cce38cb81
 *         name:
 *           type: string
 *           example: Beton
 *         description:
 *           type: string
 *           example: Duvar ve kalıplara döküm işlemi için
 *         isGlobal:
 *           type: boolean
 *           example: false
 *         siteId:
 *           type: string
 *           example: 68c1df3c93e7321cce38cb81
 *         createdBy:
 *           type: string
 *           example: 64d4e7f2b2c1a2b3c4d5e6f8
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

router.get("/", verifyAccessToken, getCostCategories);
router.get("/:siteId", verifyAccessToken, getCostCategoriesBySiteId);
router.post("/", verifyAccessToken, checkRole("admin"), createCostCategory);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole("admin"),
  deleteCostCategory
);
router.put("/:id", verifyAccessToken, checkRole("admin"), updateCostCategory);

module.exports = router;
