const mongoose = require("mongoose");
const CostCategory = require("../model/costCategory.js");
const Site = require("../model/site.js");
const User = require("../model/user.js");

const createCostCategory = async (req, res) => {
  try {
    const { name, description, isGlobal, siteId } = req.body;
    if (!name || !siteId ) {
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

module.exports = {
  createCostCategory,
};
