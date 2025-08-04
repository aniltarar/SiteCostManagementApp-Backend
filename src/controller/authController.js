const User = require("../model/user.js");
const Token = require("../model/token.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Token Oluşturma Fonksiyonu
const generateTokens = async (user) => {
  // Kısa süreli erişim token'ı
  const accessToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  // Uzun süreli refresh token'ı
  const refreshToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  //   DB'de kayıtlı olan token'ı sil.
  await Token.deleteMany({ userId: user._id });

  // Yeni token'ı oluştur ve kaydet.
  const newRefreshToken = await Token.create({
    userId: user._id,
    refreshToken: refreshToken,
    date: new Date(),
  });

  return { accessToken, refreshToken };
};

// Kullanıcı Kaydı
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message:
          "Ad, soyad, email ve şifre gereklidir. Lütfen tüm alanları doldurun.",
      });
    }

    // Kullanıcı veritabanında var mı kontrol et
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Bu email adresi zaten kayıtlı.",
      });
    }

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcıyı oluştur
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
    });

    // Token'ları oluştur
    const tokens = await generateTokens(user);

    const userWithoutPassword = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      tokens: tokens,
    };

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({
      message: "Kullanıcı kaydı sırasında bir hata oluştu.",
      error: error.message,
    });
  }
};

// Tokenları Yenileme
const tokenRefresh = async (req, res) => {
  try {
    // RefreshToken'ın eski halini al
    const oldRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!oldRefreshToken) {
      return res.status(401).json({
        message: "Refresh token bulunamadı. Lütfen tekrar giriş yapın.",
      });
    }

    // DB'de kayıtlı olan token'ı bul
    const storedToken = await Token.findOne({
      refreshToken: oldRefreshToken,
    });
    if (!storedToken) {
      return res.status(401).json({
        message:
          "Refresh token veritabanında bulunamadı. Lütfen tekrar giriş yapın.",
      });
    }
    //  Kullanıcıyı bul
    const user = await User.findById(storedToken.userId);

    if (!user) {
      return res.status(401).json({
        message: "Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.",
      });
    }

    // Yeni token'ları oluştur
    const tokens = await generateTokens(user);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    return res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({
      message: "Token yenileme sırasında bir hata oluştu.",
      error: error.message,
    });
  }
};

// Kullanıcı Girişi
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email ve şifre gereklidir. Lütfen tüm alanları doldurun.",
      });
    }

    // Kullanıcıyı veritabanında bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Bu email adresi ile kayıtlı kullanıcı bulunamadı.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Şifre yanlış. Lütfen tekrar deneyin.",
      });
    }

    // Token'ları oluştur
    const tokens = await generateTokens(user);
    const userWithoutPassword = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      tokens: tokens,
    };

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({
      message: "Giriş sırasında bir hata oluştu.",
      error: error.message,
    });
  }
};

// Kullanıcı Çıkışı
const logout = async (req,res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({
                message: "Çıkış yapmak için refresh token gereklidir.",
            });
        }
        const deletedToken = await Token.deleteOne({ refreshToken });
        if(!deletedToken){
            return res.status(400).json({
                message: "Refresh token veritabanında bulunamadı. Çıkış yaparken bir sorun oluştu.",
            });
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "none",
        });
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "none",
        });

        res.status(200).json({
            message: "Başarıyla çıkış yapıldı.",
        });
        
    } catch (error) {
      console.error("Logout Error:", error);
        res.status(500).json({
            message: "Çıkış sırasında bir hata oluştu.",
            error: error.message,

        });
    }
}

module.exports = {
    register,
    login,
    logout,
    tokenRefresh
}