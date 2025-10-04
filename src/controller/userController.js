const mongoose = require("mongoose");
const User = require("../model/user.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Parolayı hariç tut
    return res.status(200).json({
      message: "Kullanıcılar başarıyla alındı.",
      users: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Kullanıcılar alınırken bir hata oluştu.",
      error: error.message,
    });
  }
};
const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Geçersiz kullanıcı ID'si." });
        }
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }
        return res.status(200).json({
            message: "Kullanıcı başarıyla alındı.",
            user: user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Kullanıcı alınırken bir hata oluştu.",
            error: error.message,
            });
    }
}

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Geçersiz kullanıcı ID'si." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    user.role = role;
    await user.save();
    return res.status(200).json({
      message: "Kullanıcı rolü başarıyla güncellendi.",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Kullanıcı rolü güncellenirken bir hata oluştu.",
      error: error.message,
    });
  }
};

const deleteUserById = async (req, res) => {
try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Geçersiz kullanıcı ID'si." });
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    return res.status(200).json({
        message: "Kullanıcı başarıyla silindi.",
        user: user,
    });
    
} catch (error) {
    return res.status(500).json({
        message: "Kullanıcı silinirken bir hata oluştu.",
        error: error.message,
    });
}
}

module.exports = {
  getAllUsers,
  updateUserRole,
  getUserById,
  deleteUserById
};
