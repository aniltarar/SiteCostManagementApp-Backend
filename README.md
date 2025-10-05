# Şantiye Maliyet Yönetim Sistemi - Backend

Firmaların şantiye bazında yaptıkları tüm giderleri kategorize ederek kayıt altına alabileceği, kullanıcı yetkilerine göre yönetebileceği backend API projesi.

## Özellikler

- JWT tabanlı kimlik doğrulama (Access & Refresh Token)
- Rol bazlı yetkilendirme (Admin, Editor, User)
- Şantiye CRUD işlemleri
- Maliyet kategorileri ve maliyet kayıtları
- Multer ile dosya/fatura yükleme
- Express-validator ile input validasyonu
- Swagger API dokümantasyonu
- Bcrypt ile şifre güvenliği
- CORS desteği

## Teknolojiler

- **Runtime:** Node.js
- **Framework:** Express.js
- **Veritabanı:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Validasyon:** express-validator
- **Dosya Yükleme:** Multer
- **Şifreleme:** bcryptjs
- **Dokümantasyon:** Swagger
- **Logging:** Morgan

## Kurulum

### Gereksinimler

- Node.js (v14+)
- MongoDB
- npm veya yarn

### Adımlar

1. Repoyu klonlayın:
```bash
git clone https://github.com/aniltarar/SiteCostManagementApp-Backend.git
cd SiteCostManagementApp-Backend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun:
```env
PORT=3005
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

4. Uygulamayı başlatın:
```bash
npm run dev
```

5. API erişim:
- Base URL: `http://localhost:3005`
- Swagger: `http://localhost:3005/api-docs`

## API Endpoints

### Authentication
- `POST /auth/register` - Kullanıcı kaydı
- `POST /auth/login` - Giriş
- `POST /auth/logout` - Çıkış
- `POST /auth/token-refresh` - Token yenileme

### User (Admin)
- `GET /user` - Kullanıcıları listele
- `GET /user/:userId` - Kullanıcı detay
- `PUT /user/:userId` - Rol güncelle
- `DELETE /user/:userId` - Kullanıcı sil

### Site (Şantiye)
- `GET /site` - Şantiyeleri listele
- `GET /site/:siteId` - Şantiye detay
- `POST /site` - Şantiye oluştur
- `PUT /site/:siteId` - Şantiye güncelle
- `DELETE /site/:siteId` - Şantiye sil

### Cost Category
- `GET /cost-category` - Kategorileri listele
- `GET /cost-category/:siteId` - Şantiye kategorileri
- `POST /cost-category` - Kategori oluştur
- `PUT /cost-category/:id` - Kategori güncelle
- `DELETE /cost-category/:id` - Kategori sil

### Cost (Maliyet)
- `GET /cost/:siteId` - Şantiye maliyetleri
- `POST /cost` - Maliyet ekle (dosya yükleme destekli)
- `PUT /cost/:costId` - Maliyet güncelle
- `DELETE /cost/:costId` - Maliyet sil

## Rol Yetkilendirme

### Admin
- Tüm şantiyeleri ve kullanıcıları yönetir
- Maliyet kategorileri ve kayıtları oluşturur
- Kullanıcı rollerini değiştirir

### Editor
Middleware'de tanımlı, geliştirilme aşamasında

### User
Middleware'de tanımlı, geliştirilme aşamasında

## Veritabanı Modelleri

### User
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: Enum['user', 'editor', 'admin']
}
```

### Site
```javascript
{
  name: String,
  location: String,
  budget: Number,
  startDate: Date,
  endDate: Date,
  createdBy: ObjectId
}
```

### CostCategory
```javascript
{
  name: String,
  description: String,
  isGlobal: Boolean,
  siteId: ObjectId
}
```

### Cost
```javascript
{
  title: String,
  unit: Enum,
  quantity: Number,
  unitPrice: Number,
  netAmount: Number,
  taxRate: Number,
  taxAmount: Number,
  grossAmount: Number,
  moneyType: Enum,
  costCategory: ObjectId,
  siteId: ObjectId,
  createdBy: ObjectId,
  fileUrl: String
}
```

## Güvenlik

- Şifreler bcrypt ile hash'lenir
- JWT token'lar httpOnly cookie'lerde saklanır
- Input validasyonu tüm endpoint'lerde aktif
- Dosya yükleme tip ve boyut kontrolü
- CORS yapılandırması

## İletişim

**Anıl Tarar**
- LinkedIn: [https://www.linkedin.com/in/anil-tarar/](https://www.linkedin.com/in/anil-tarar/)
- Email: aniltararr@gmail.com

## Lisans

Bu proje kişisel portfolyo amaçlı geliştirilmiştir.
