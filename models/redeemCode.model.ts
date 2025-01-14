import { Schema, model, models } from "mongoose";

const redeemCodeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    ref: "User",
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    default: Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  limit: {
    type: Number,
    default: 1,
  },
  redeemed : {
    type: Number,
    default: 0,
  }
});

redeemCodeSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

export default models.RedeemCode || model("RedeemCode", redeemCodeSchema);