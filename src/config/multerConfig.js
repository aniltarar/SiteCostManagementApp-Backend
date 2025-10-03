const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const siteId = req.body.siteId;
    if (!siteId) {
      return cb(new Error("Multer Error | Site ID gereklidir!"), null);
    }
    // Şantiyeye özel klasör oluşturma
    const uploadPath = path.join(__dirname, "..", "uploads", "costs", siteId);
    // klasör yapısı => uploads/costs/{siteId}
    //eğer klasör yoksa oluştur
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    // uniqueSuffix oluşturma
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = `cost-${uniqueSuffix}${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  // Sadece belirli dosya türlerine izin ver
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Multer Error | Geçersiz dosya türü! Sadece JPEG, PNG, JPG ve PDF dosyalarına izin verilir."
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB dosya boyutu sınırı
  fileFilter: fileFilter,
});

module.exports = upload;
