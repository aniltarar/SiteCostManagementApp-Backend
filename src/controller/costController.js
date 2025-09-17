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
      createdBy,
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
      !siteId ||
      !createdBy
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
    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(404).json({
        message: "Belirtilen kullanıcı bulunamadı.",
      });
    }
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
