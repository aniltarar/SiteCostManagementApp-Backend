const mongoose = require("mongoose");

const CostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    unit: {
      type: String,
      enum: {
        values: [
          "adet",
          "kg",
          "litre",
          "metre",
          "santim",
          "koli",
          "paket",
          "diger",
        ],
        message:
          "unit sadece şu değerlerden biri olabilir: adet, kg, litre, metre, santim, koli, paket, diger",
      },
      required: true,
      default: "adet",
      lowercase: true, // istersen otomatik küçük harfe çevir
      trim: true,
    },
    quantity: { type: Number, required: true, default: 1 },
    unitPrice: { type: Number, required: true },

    // Ayrı ayrı tutulan tutarlar
    netAmount: { type: Number }, // Vergisiz toplam
    taxRate: { type: Number, default: 0 }, // % KDV
    taxAmount: { type: Number }, // Vergi tutarı
    grossAmount: { type: Number }, // Vergili toplam

    moneyType: {
      type: String,
      enum: [
        "TRY",
        "USD",
        "EUR",
        "GBP",
        "JPY",
        "CNY",
        "AUD",
        "CAD",
        "CHF",
        "SEK",
        "NOK",
        "DKK",
      ],
      required: true,
      default: "TRY",
    },
    costCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CostCategory",
      required: true,
    },
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook ile otomatik hesaplama
CostSchema.pre("save", function (next) {
  this.netAmount = this.quantity * this.unitPrice; // Vergisiz toplam
  this.taxAmount = this.netAmount * (this.taxRate / 100); // Vergi tutarı
  this.grossAmount = this.netAmount + this.taxAmount; // Vergili toplam
  next();
});

module.exports = mongoose.model("Cost", CostSchema);
