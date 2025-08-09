const mongoose = require("mongoose");
const Site = require("../model/site.js");
const User = require("../model/user.js");

const createSite = async (req, res) => {
  try {

    const { name, location, budget, startDate, endDate } = req.body;
    if (!name || !location || !budget || !startDate || !endDate) {
      return res.status(400).json({
        message: "Tüm alanlar gereklidir. Lütfen tüm alanları doldurun.",
      });
    }
    // kullanıcının kimliğini doğrula
    const userId = req.user.userId; // req.user, kimlik doğrulama middleware tarafından ayarlanmalıdır
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.",
      });
    }
    const createdBy = new mongoose.Types.ObjectId(userId);
    // Yeni site oluştur
    const newSite = await Site.create({
      name,
      location,
      budget,
      startDate,
      endDate,
      createdBy,
    });
    return res.status(201).json({
      message: "Site başarıyla oluşturuldu.",
      site: newSite,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Site oluşturulurken bir hata oluştu.",
      error: error.message,
    });
  }
};

module.exports={ createSite };