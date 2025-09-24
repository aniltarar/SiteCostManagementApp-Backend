const mongoose = require("mongoose");
const Site = require("../model/site.js");
const User = require("../model/user.js");

const createSite = async (req, res) => {
  try {
    const { name, location, budget, startDate, endDate, assignedUsers } =
      req.body;
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
      assignedUsers: assignedUsers || [],
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

const getAllSites = async (res) => {
  try {
    // Tüm şantiyeleri al, bu sadece "admin" rolüne sahip kullanıcılar için
    const sites = await Site.find().populate(
      "createdBy",
      "firstName lastName email"
    );
    return res.status(200).json({
      message: "Şantiyeler başarıyla alındı.",
      sites: sites,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Şantiyeler alınırken bir hata oluştu.",
      error: error.message,
    });
  }
};
const getSiteById = async (req, res) => {
  try {
    const siteId = req.params.siteId;
    const site = await Site.findById(siteId).populate(
      "createdBy",
      "firstName lastName email"
    );
    if (!site) {
      return res.status(404).json({
        message: "Şantiye bulunamadı.",
      });
    }
    return res.status(200).json({
      message: "Şantiye başarıyla alındı.",
      site: site,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Şantiye alınırken bir hata oluştu.",
      error: error.message,
    });
  }
};

const deleteSiteById = async (req, res) => {
  try {
    const { siteId } = req.params;
    const deletedSite = await Site.findByIdAndDelete(siteId);
    if (!deletedSite) {
      return res.status(404).json({
        message: "Şantiye bulunamadı.",
      });
    }
    return res.status(200).json({
      message: "Şantiye başarıyla silindi.",
      site: deletedSite,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Şantiyeler silinirken bir hata oluştu.",
      error: error.message,
    });
  }
};

const updateSiteById = async (req, res) => {
  try {
    const siteId = req.params.siteId;
    const updateFields = {};

    // Sadece gönderilen alanları ekle
    const allowedFields = [
      "name",
      "location",
      "budget",
      "startDate",
      "endDate",
      "assignedUsers",
    ];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        message: "Güncellenecek en az bir alan gönderilmelidir.",
      });
    }

    const updatedSite = await Site.findByIdAndUpdate(siteId, updateFields, {
      new: true,
    });

    if (!updatedSite) {
      return res.status(404).json({
        message: "Şantiye bulunamadı.",
      });
    }

    return res.status(200).json({
      message: "Şantiye başarıyla güncellendi.",
      site: updatedSite,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Şantiye güncellenirken bir hata oluştu.",
      error: error.message,
    });
  }
};

module.exports = {
  createSite,
  getAllSites,
  getSiteById,
  deleteSiteById,
  updateSiteById,
};
