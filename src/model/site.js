const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Site", siteSchema);
