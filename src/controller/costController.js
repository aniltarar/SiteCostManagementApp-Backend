const mongoose = require("mongoose");
const Cost = require("../model/costModel.js");
const CostCategory = require("../model/costCategory.js");
const Site = require("../model/site.js");
const User = require("../model/user.js");

const createCost = async (req, res) => {
  try {
    const {
      title,
      description,
      unit,
      quantity,
      unitPrice,
      taxRate,
      moneyType,
      costCategory,
      siteId,

      fileUrl,
    } = req.body;

    // validatör ile gerekli alanları kontrol et || sonra yapılacak
    if (
      !title ||
      !unit ||
      !quantity ||
      !unitPrice ||
      !moneyType ||
      !costCategory ||
      !siteId
    ) {
      return res.status(400).json({
        message: "Lütfen tüm gerekli alanları doldurun.",
      });
    }

    // Şantiye var mı kontrol et
    const site = await Site.findById(siteId);
    if (!site) {
      return res.status(404).json({
        message: "Belirtilen şantiye bulunamadı.",
      });
    }
    // Kullanıcı var mı kontrol et

    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Kullanıcı bulunamadı. Lütfen tekrar giriş yapın." });
    }
    const createdBy = new mongoose.Types.ObjectId(userId);

    // Maliyet kategorisi var mı kontrol et
    const category = await CostCategory.findById(costCategory);
    if (!category) {
      return res.status(404).json({
        message: "Belirtilen maliyet kategorisi bulunamadı.",
      });
    }
    // Yeni maliyet oluştur

    const newCost = await Cost.create({
      title,
      description,
      unit,
      quantity,
      unitPrice,
      taxRate,
      moneyType,
      costCategory,
      siteId,
      createdBy,
      fileUrl,
    });

    return res.status(201).json({
      message: "Maliyet başarıyla oluşturuldu.",
      cost: newCost,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gider oluşturulurken bir hata oluştu.",
      error: error.message,
    });
  }
};

const getCostsBySiteId = async (req, res) => {
  try {
    const { siteId } = req.params;
    // Şantiye var mı kontrol et
    const site = await Site.findById(siteId);
    if (!site) {
      return res.status(404).json({
        message: "Belirtilen şantiye bulunamadı.",
      });
    }
    // Cost'un hepsini al, içerisindeki costCategory alanını populate et
    const costs = await Cost.find({ siteId: siteId }).populate(
      "costCategory",
      "name description"
    );
    return res.status(200).json({
      message: "Giderler başarıyla alındı.",
      costs: costs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Giderler alınırken bir hata oluştu.",
      error: error.message,
    });
  }
};

const updateCostById = async (req, res) => {
  try {
    const { costId } = req.params;
    const updateData = req.body;

    const updatedCost = await Cost.findByIdAndUpdate(costId, updateData, {
      new: true,
      runValidators: true, // <— enum, min/max vs. çalışır
      context: "query", // <— bazı validator’lar için gerekli
    });

    if (!updatedCost) {
      return res.status(404).json({ message: "Gider bulunamadı." });
    }

    return res.status(200).json({
      message: "Gider başarıyla güncellendi.",
      cost: updatedCost,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gider güncellenirken bir hata oluştu.",
      error: error.message,
    });
  }
};

const deleteCostById = async (req,res) => {
  try {
    const { costId } = req.params;
    const deletedCost = await Cost.findByIdAndDelete(costId);
    if (!deletedCost) {
      return res.status(404).json({
        message: "Gider bulunamadı.",
      });
    }
    return res.status(200).json({
      message: "Gider başarıyla silindi.",
      cost: deletedCost,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gider silinirken bir hata oluştu.",
      error: error.message,
    });
  }
}

module.exports = {
  createCost,
  getCostsBySiteId,
  updateCostById,
  deleteCostById
};
