const mongoose = require("mongoose");
const CostCategory = require("../model/costCategory.js");
const Site = require("../model/site.js");
const User = require("../model/user.js");

const getCostCategories = async (req, res) => {
  try {
    const costCategories = await CostCategory.find();
    return res.status(200).json({
      costCategoriesCount: costCategories.length,
      message: "Cost categories başarıyla listelendi.",
      costCategories,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cost categories listelenirken bir hata oluştu." });
  }
};

const getCostCategoriesBySiteId = async (req, res) => {
  try {
    const { siteId } = req.params;
    const costCategories = await CostCategory.find({ siteId });

    if (costCategories.length === 0) {
      return res
        .status(404)
        .json({ message: "Bu şantiyeye ait hiç cost category bulunamadı." });
    }

    return res.status(200).json({
      costCategoriesCount: costCategories.length,
      message: "Cost categories başarıyla listelendi.",
      costCategories,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cost categories listelenirken bir hata oluştu." });
  }
};

const createCostCategory = async (req, res) => {
  try {
    const { name, description, isGlobal, siteId } = req.body;
    if (!name || !siteId) {
      return res.status(400).json({
        message: "Tüm alanlar gereklidir. Lütfen tüm alanları doldurun.",
      });
    }

    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Kullanıcı bulunamadı. Lütfen tekrar giriş yapın." });
    }
    const createdBy = new mongoose.Types.ObjectId(userId);

    const site = await Site.findById(siteId);
    if (!site) {
      return res.status(404).json({ message: "Site bulunamadı." });
    }

    const newCostCategory = await CostCategory.create({
      name,
      description,
      isGlobal: isGlobal || false,
      siteId,
      createdBy,
    });
    return res.status(201).json({
      message: "Cost category başarıyla oluşturuldu.",
      costCategory: newCostCategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cost category oluşturulurken bir hata oluştu." });
  }
};

const deleteCostCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await CostCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Cost category bulunamadı." });
    }
    return res.status(200).json({
      message: "Cost category başarıyla silindi.",
      costCategory: deletedCategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cost category silinirken bir hata oluştu." });
  }
};

const updateCostCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isGlobal, siteId } = req.body;

    const updatedCategory = await CostCategory.findByIdAndUpdate(
      id,
      { name, description, isGlobal, siteId },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Cost category bulunamadı." });
    }

    return res.status(200).json({
      message: "Cost category başarıyla güncellendi.",
      costCategory: updatedCategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cost category güncellenirken bir hata oluştu." });
  }
};

module.exports = {
  createCostCategory,
  deleteCostCategory,
  updateCostCategory,
  getCostCategories,
  getCostCategoriesBySiteId,
};
